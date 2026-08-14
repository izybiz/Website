/* Envoi des formulaires du site vers Web3Forms.
 *
 * Partagé par la home (3 formulaires de diagnostic) et la page contact
 * (1 formulaire détaillé). Ces deux familles ne posent pas les mêmes questions
 * et ne demandent pas le même geste à qui les reçoit : elles produisent donc
 * deux mails distincts, décrits dans KINDS ci-dessous.
 *
 * Le destinataire n'est pas ici : il est attaché à la clé, côté tableau de bord
 * (app.web3forms.com). Changer l'adresse de réception ne demande aucune
 * modification du site.
 *
 * La clé est publique par conception — Web3Forms l'affiche comme telle et elle
 * voyage dans le JS livré. Ce n'est pas un secret échappé.
 */
(function () {
  "use strict";

  var WEB3FORMS_KEY = "ae024e50-5c9a-418c-9a35-0572c0dea506";
  var WEB3FORMS_URL = "https://api.web3forms.com/submit";

  // Noms réservés par Web3Forms : un champ visible qui porterait l'un d'eux
  // serait interprété comme un réglage et n'apparaîtrait pas dans le mail.
  // C'est pourquoi le choix « votre demande » de la page contact s'appelle
  // `demande` et non `subject`.

  /* ------------------------------------------------------------------ *
   * Mise en forme du mail reçu
   * ------------------------------------------------------------------ */

  // Web3Forms affiche le **nom** de chaque champ en titre, dans l'ordre
  // d'envoi. Ces noms sont donc rédigés pour être lus dans une boîte de
  // réception. Seule la phrase d'introduction du mail échappe à ce contrôle :
  // Web3Forms la réserve à ses offres payantes.
  //
  // Les champs vides sont écartés : un intitulé sans réponse en dessous fait
  // croire à une information perdue.

  // « https://www.boulangerie-dupont.fr/contact » → « boulangerie-dupont.fr ».
  // L'adresse complète reste dans le corps du mail ; l'objet, lui, doit tenir
  // sur une ligne de boîte de réception.
  function hostOf(url) {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch (error) {
      // Adresse que le navigateur a laissé passer mais que URL refuse : mieux
      // vaut un objet imparfait qu'un envoi qui échoue.
      return url || "site non précisé";
    }
  }

  var KINDS = {
    diagnostic: {
      // La home a sa modale de confirmation ; ce texte ne sert que si le
      // navigateur ne gère pas <dialog>.
      success: "Votre demande est bien partie. Merci !",

      build: function (get) {
        var site = get("website");
        return {
          subject: "Nouvelle demande de diagnostic — " + hostOf(site),
          fields: [
            [
              "À faire",
              "Démarrer le diagnostic, puis en envoyer le résultat au visiteur.",
            ],
            ["Site à analyser", site],
            ["Répondre au visiteur", get("email")],
            ["Demande envoyée depuis", get("origine") || "Home"],
          ],
        };
      },
    },

    contact: {
      success: "Message envoyé. Nous vous répondons sous un jour ouvré.",

      build: function (get) {
        var demande = get("demande") || "Une question";
        var nom = get("nom");
        var site = get("website");

        // L'objet doit distinguer deux messages dans une liste : le type de
        // demande, puis qui écrit — son nom s'il l'a donné, son domaine sinon.
        var qui = nom || (site ? hostOf(site) : get("email"));

        return {
          subject: "Contact — " + demande + " — " + qui,
          fields: [
            [
              "À faire",
              demande === "Diagnostic gratuit"
                ? "Démarrer le diagnostic, puis en envoyer le résultat au visiteur."
                : "Répondre au visiteur sous un jour ouvré.",
            ],
            ["Objet de la demande", demande],
            ["Message", get("message")],
            ["Nom", nom],
            ["Entreprise", get("entreprise")],
            ["Répondre au visiteur", get("email")],
            ["Son site", site],
          ],
        };
      },
    },
  };

  /* ------------------------------------------------------------------ *
   * Envoi
   * ------------------------------------------------------------------ */

  function send(form, data) {
    var kind = KINDS[form.dataset.formKind] || KINDS.diagnostic;

    function get(name) {
      var value = data.get(name);
      return value === null ? "" : String(value).trim();
    }

    var built = kind.build(get);

    var payload = {
      access_key: WEB3FORMS_KEY,
      subject: built.subject,
      from_name: "Site izybiz",

      // Aucun champ ne s'appelle `email`, donc Web3Forms ne peut pas deviner
      // l'adresse de réponse : on la désigne, sinon « Répondre » ne mène nulle
      // part.
      replyto: get("email"),
    };

    built.fields.forEach(function (pair) {
      if (pair[1]) payload[pair[0]] = pair[1];
    });

    // Le honeypot n'est transmis que si un robot l'a coché — une case décochée
    // ne part jamais. Web3Forms rejette alors la soumission de lui-même.
    if (data.get("botcheck")) payload.botcheck = data.get("botcheck");

    return fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    }).then(function (response) {
      // Un refus revient en 4xx avec un corps JSON explicite, sans lever
      // d'exception : c'est `success` qui fait foi, pas le seul fait que la
      // requête ait abouti.
      return response.json().then(function (result) {
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Envoi refusé");
        }
        return result;
      });
    });
  }

  /* ------------------------------------------------------------------ *
   * Comportement des formulaires
   * ------------------------------------------------------------------ */

  // Le champ site est un <input type="url"> : le navigateur refuse
  // « izybiz.fr » tant qu'il n'y a pas de schéma. Or c'est exactement ce qu'un
  // visiteur tape. On complète donc en https:// à sa place, plutôt que de lui
  // opposer un « saisissez une URL valide » sur une adresse qui l'est.
  var HAS_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;

  function normalizeWebsite(input) {
    if (!input) return;
    var value = input.value.trim();
    input.value = !value || HAS_SCHEME.test(value) ? value : "https://" + value;
  }

  function initForms() {
    var forms = Array.prototype.slice.call(
      document.querySelectorAll("[data-site-form]"),
    );
    if (!forms.length) return;

    var modal = document.getElementById("hv2-diagnostic-modal");

    if (modal) {
      modal.addEventListener("click", function (event) {
        // Un clic hors du panneau (donc sur le fond) referme la modale.
        if (event.target === modal) modal.close();
      });

      var closeBtn = modal.querySelector("[data-modal-close]");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          modal.close();
        });
      }
    }

    forms.forEach(function (form) {
      var website = form.querySelector('input[name="website"]');
      var submit = form.querySelector('button[type="submit"]');
      var message = form.querySelector("[data-form-message]");
      var submitLabel = submit ? submit.textContent : "";
      var kind = KINDS[form.dataset.formKind] || KINDS.diagnostic;

      // Dès que le visiteur quitte le champ, il voit l'adresse complétée : pas
      // de correction invisible au moment de l'envoi.
      if (website) {
        website.addEventListener("blur", function () {
          normalizeWebsite(website);
        });
      }

      // `role="alert"` sur un élément déjà présent mais vide : le lecteur
      // d'écran annonce le texte au moment où on l'insère.
      function say(text, isError) {
        if (!message) return;
        message.textContent = text;
        message.classList.toggle("is-error", isError === true);
      }

      function release() {
        if (!submit) return;
        submit.disabled = false;
        submit.textContent = submitLabel;
      }

      form.addEventListener("submit", function (event) {
        event.preventDefault();
        normalizeWebsite(website);

        // Les formulaires portent `novalidate` : on déclenche nous-mêmes la
        // validation native, qui affiche ses messages en français.
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }

        // Un message précédent n'a plus lieu d'être affiché pendant qu'on
        // retente, et le bouton verrouillé évite les doubles envois sur une
        // connexion lente.
        say("");
        if (submit) {
          submit.disabled = true;
          submit.textContent = "Envoi…";
        }

        send(form, new FormData(form)).then(
          function () {
            if (typeof window.izybizTrackEvent === "function") {
              window.izybizTrackEvent("form_submitted", {
                location: form.dataset.formLocation || "inconnu",
              });
            }

            form.reset();
            release();

            // La home confirme par une modale ; la page contact, qui n'en a
            // pas, affiche sa confirmation sous le bouton.
            if (
              form.dataset.formKind === "diagnostic" &&
              modal &&
              typeof modal.showModal === "function"
            ) {
              modal.showModal();
            } else {
              say(kind.success);
            }
          },
          function () {
            // Le visiteur a saisi son adresse : lui laisser une porte de sortie
            // vaut mieux qu'un simple « réessayez ».
            say(
              "L'envoi n'a pas abouti. Réessayez, ou écrivez-nous directement à contact.me@izybiz.fr.",
              true,
            );
            release();
          },
        );
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initForms);
  } else {
    initForms();
  }
})();
