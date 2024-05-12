// Lister des situations du jeu
//creation d'un tableau d'objets 
const situations = [
    {
        description: "Situation 1 : Vous recevez des messages inappropriés d'un collègue sur votre messagerie professionnelle. Que faites-vous ?",
        reponses: [
            "A. Ignorer les messages.",
            "B. Rire des messages.",
            "C. Signaler les messages à votre responsable des ressources humaines."
        ],
        reponse_correcte: "C. Signaler les messages à votre responsable des ressources humaines."
    },
    {
        description: "Situation 2 : Lors d'une réunion, un collègue vous fait des commentaires déplacés sur votre apparence. Comment réagissez-vous ?",
        reponses: [
            "A. Ignorer les commentaires.",
            "B. Riposter avec des commentaires déplacés.",
            "C. Dire à votre collègue que ses commentaires sont inappropriés et que vous souhaitez qu'il arrête."
        ],
        reponse_correcte: "C. Dire à votre collègue que ses commentaires sont inappropriés et que vous souhaitez qu'il arrête."
    },
    
    {
        description: "Situation 3 : Vous découvrez des preuves de harcèlement sexuel au travail, mais le coupable est un supérieur hiérarchique influent. Que faites-vous ?",
        reponses: [
            "A. Garder le silence par peur de représailles.",
            "B. Parler à vos collègues et former un groupe pour dénoncer le harcèlement.",
            "C. Signaler immédiatement le harcèlement aux ressources humaines, en fournissant les preuves."
        ],
        reponse_correcte: "C. Signaler immédiatement le harcèlement aux ressources humaines, en fournissant les preuves."
    },
    {
        description: "Situation 4 : Vous êtes témoin de harcèlement sexuel envers un collègue, mais la victime ne souhaite pas en parler. Comment réagissez-vous ?",
        reponses: [
            "A. Respecter la volonté de la victime et ne rien faire.",
            "B. Parler au harceleur en privé pour lui demander d'arrêter.",
            "C. Parler à la victime de manière confidentielle, lui offrir votre soutien, et lui expliquer les options disponibles."
        ],
        reponse_correcte: "C. Parler à la victime de manière confidentielle, lui offrir votre soutien, et lui expliquer les options disponibles."
    },
    {
        description: "Situation 5 : Vous êtes accusé à tort de harcèlement sexuel au travail. Comment réagissez-vous ?",
        reponses: [
            "A. Ignorer l'accusation et espérer que cela se résolve de lui-même.",
            "B. Nier fermement les accusations et confronter l'accusateur en public.",
            "C. Coopérer pleinement avec l'enquête interne, en fournissant des preuves pour prouver votre innocence."
        ],
        reponse_correcte: "C. Coopérer pleinement avec l'enquête interne, en fournissant des preuves pour prouver votre innocence."
    },
    
];

// Variables pour suivre l'état du jeu
let currentSituationIndex = 0;  // Pour determiner la terminaison du jeu 
let score = 0; //Nombre de réponses correctes de l'utilisateur
let termine = false; //Pour contrôler l'affichage des messages de fin de jeu


// Fonction pour afficher la situation actuelle
function afficherSituation() {
    const descriptionSituation = document.getElementById("description-situation");
    const reponsesSituation = document.getElementById("reponses-situation");

    // Vérifiez si le jeu est terminé
    if (termine) {
        descriptionSituation.textContent = "Le jeu est terminé. Votre score final est : " + score + "/" + situations.length;
        reponsesSituation.innerHTML = "";
    } else {
        const situationActuelle = situations[currentSituationIndex];
        descriptionSituation.textContent = situationActuelle.description;

        // Affichez les réponses possibles avec les boutons radio
        reponsesSituation.innerHTML = "";
        for (let i = 0; i < situationActuelle.reponses.length; i++) {
            const reponse = situationActuelle.reponses[i];
            const reponseElement = document.createElement("div");

            // Créez un bouton radio pour chaque réponse
            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.name = "reponse-utilisateur";
            radioButton.id = "reponse-" + i; // ID unique pour chaque bouton radio
            reponseElement.appendChild(radioButton);

            // Créez une étiquette pour le bouton radio
            const label = document.createElement("label");
            label.setAttribute("for", "reponse-" + i); // Associez l'étiquette au bouton radio
            label.textContent = (i + 1) + ". " + reponse;

            // Ajoutez l'étiquette à l'élément de réponse
            reponseElement.appendChild(label);

            // Ajoutez l'élément de réponse à la liste des réponses
            reponsesSituation.appendChild(reponseElement);
        }
    }
}
// ...


// Fonction pour valider la réponse de l'utilisateur
function validerReponse() {
    if (termine) {
        afficherScoreEtStatistiques();
        return;
    }

    const situationActuelle = situations[currentSituationIndex];
    // Récupérez les réponses de l'utilisateur (les boutons radio) d 
    const reponsesUtilisateur = document.getElementsByName("reponse-utilisateur");

    // Parcourez les réponses possibles et vérifiez si l'utilisateur a coché la réponse correcte
    let reponseCorrecteIndex = -1;
    for (let i = 0; i < reponsesUtilisateur.length; i++) {
        if (reponsesUtilisateur[i].checked) {
            reponseCorrecteIndex = i;
            break;
        }
    }

    // Vérifiez si une réponse a été sélectionnée
    if (reponseCorrecteIndex !== -1) {
        if (reponseCorrecteIndex === situationActuelle.reponses.indexOf(situationActuelle.reponse_correcte)) {
            // La réponse est correcte
            score++;
        }
        // Passez à la prochaine situation
        currentSituationIndex++;

        // Vérifiez si le jeu est terminé
        if (currentSituationIndex === situations.length) {
            termine = true;
        }

        // Affichez la situation suivante ou le message de fin de jeu
        afficherSituation();
    } else {
        // Aucune réponse sélectionnée, affichez un message d'erreur
        const message = document.getElementById("message");
        message.textContent = "Veuillez sélectionner une réponse avant de valider.";
    }
}

// Fonction pour afficher le score et les statistiques
function afficherScoreEtStatistiques() {
    const scoreFinal = document.getElementById("score-final");
    const statistiques = document.getElementById("statistiques");

    // Calculez le pourcentage de réponses correctes
    const pourcentageReponsesCorrectes = (score / situations.length) * 100;

    // Affichez le score et les statistiques
    scoreFinal.textContent = "Votre score final est : " + score + "/" + situations.length;
    statistiques.textContent = "Pourcentage de réponses correctes : " + pourcentageReponsesCorrectes.toFixed(2) + "%";

    // Affichez des messages personnalisés en
    let message = "";
    if (pourcentageReponsesCorrectes < 80) {
    message = "Il semble que certaines réponses n'étaient pas correctes. Pensez à revisiter les concepts de sensibilisation au harcèlement sexuel au travail.";
    message += " Voici quelques recommandations :";
    message += " 1. Prenez le temps de comprendre les politiques de l'entreprise concernant le harcèlement sexuel.";
    message += " 2. Soyez attentif aux signes de harcèlement et n'hésitez pas à signaler toute situation inappropriée.";
    message += " 3. Discutez de la sensibilisation au harcèlement sexuel avec vos collègues pour mieux comprendre les différents scénarios possibles.";
    } else {
    message = "Félicitations ! Votre connaissance en matière de sensibilisation au harcèlement sexuel est excellente.";
    message += " N'oubliez pas d'encourager vos collègues à participer à cet escape game pour améliorer leur compréhension également.";
    }
    
    // Affichez le message
    const messageElement = document.getElementById("message");
    messageElement.textContent = message;
    }
    
    // Fonction pour rejouer le jeu
    function rejouer() {
      // Réinitialisez les statistiques et cachez le message
      const scoreFinal = document.getElementById("score-final");
      const statistiques = document.getElementById("statistiques");
      const message = document.getElementById("message");
  
      scoreFinal.textContent = "";
      statistiques.textContent = "";
      message.textContent = "";
    // Réinitialisez les variables de jeu
    currentSituationIndex = 0;
    score = 0;
    termine = false;
    
    // Mélangez les situations pour une nouvelle partie
    shuffleSituations();
    
    // Réinitialisez les réponses de l'utilisateur
    const reponsesUtilisateur = document.getElementsByName("reponse-utilisateur");
    for (let i = 0; i < reponsesUtilisateur.length; i++) {
    reponsesUtilisateur[i].checked = false;
    }
    
    // Affichez la première situation
    afficherSituation();
    }
    
    // Fonction pour mélanger les situations
    function shuffleSituations() {
    for (let i = situations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [situations[i], situations[j]] = [situations[j], situations[i]];
    }
    }
    
    // Événement lorsque le bouton "Valider" est cliqué
    document.getElementById("valider-button").addEventListener("click", validerReponse);
    
    // Événement lorsque le bouton "Rejouer" est cliqué
    document.getElementById("rejouer-button").addEventListener("click", rejouer);
    
    // Appelez la fonction pour afficher la première situation
    afficherSituation();
  