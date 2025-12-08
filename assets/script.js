// assets/script.js

// --- 1. CONFIGURATION DU CONTENU (Ajoutez vos chemins ici) ---
// --- 1. CONFIGURATION DU CONTENU (Ajoutez vos chemins ici) ---
const doorContents = [
    {
        day: 1,
        type: 'code', 
        content: `
<pre><code class="language-python">
def evaluer_clause(clause, list_var):
    if len(clause) == 0:
        return False
    none = False
    for i in clause:
        val = list_var[abs(i) - 1] 

        if val == None:
            none = True
            continue
        
        if i < 0:
            val = not val
        
        if val == True:
            return True
            
    if none:
        return None
        
    return False
</code></pre>`
    },
    { 
        day: 2, 
        type: 'code', 
        content: `
<pre><code class="language-python">
def evaluer_cnf(formule,list_var):
    none = False

    for clause in formule: 
        if evaluer_clause(clause,list_var) == False:
            return False
        else :
            if evaluer_clause(clause,list_var) == None:
                return None
    return True
</code></pre>`
    },
    { 
        day: 3, 
        type: 'code', 
        content: `
<pre><code class="language-python">
def determine_valuations(list_var):
    if None not in list_var:
        return [list_var]
    true = list_var.copy()
    false = list_var.copy()

    for i in range(len(list_var)):
        if list_var[i] == None:
            true[i] = True
            false[i] = False
            break
    return determine_valuations(true) + determine_valuations(false)
</code></pre>` 
    },
    { 
        day: 4, 
        type: 'code', 
        content: `
<pre><code class="language-python">
def enlever_litt_for(formule,litteral):
    nouvelle_formule = []

    for clause in formule :
        nouvelle_clause = []
        supprimer_clause = False

        for e in clause :
            if e == litteral :
                supprimer_clause = True
            elif e != -litteral :
                nouvelle_clause.append(e)
        if not supprimer_clause :
            nouvelle_formule.append(nouvelle_clause)
    return nouvelle_formule
</code></pre>` 
    },
    { 
        day: 5, 
        type: 'code', 
        content: `
<pre><code class="language-python">
def init_formule_simpl_for(formule_init,list_var):
    for i in range(len(list_var)) :
        if list_var[i] == False :
            formule_init = enlever_litt_for(formule_init, -(i+1))
        elif list_var[i] == True:
            formule_init = enlever_litt_for(formule_init, (i+1))
    return formule_init
</code></pre>` 
    },
    { 
        day: 6, 
        type: 'img', 
        src: 'assets/20251014_150019.jpg',
        alt: 'Image du Jour 6', 
        caption: 'Cbien lheskuel' 
    },
    { day: 7, type: 'text', content: 'PAS DE FICHIER PARTAGERRRRRRRRRRRRRRRRRRRRRRRRRR' },
    { 
        day: 8, 
        type: 'img', 
        src: 'assets/steal.jpg',
        alt: 'Image du Jour 8', 
        caption: 'Who is the owner of this code' 
    },
    { 
        day: 9, 
        type: 'fact', 
        content: 'Le premier langage de programmation "haut niveau" jamais conçu était le **Plankalkül**, créé par Konrad Zuse entre 1942 et 1945, bien qu\'il n\'ait été publié qu\'en 1972.'
    },
    { 
        day: 10, 
        type: 'code', 
        content: `
<pre><code class="language-python">
def dpll(formule, list_var):
    # Simplification de l'initialisation
    formule = init_formule_simpl_for(formule, list_var)

    # Vérification : Formule vide (satisfiable)
    if len(formule) == 0:
        return True, list_var

    # Vérification : Clause vide (insatisfiable)
    if any(len(clause) == 0 for clause in formule):
        return False, None

    # Choisir un littéral non assigné (heuristique simple : le premier littéral dans la première clause non vide)
    litteral_choisi = None
    for clause in formule:
        if len(clause) > 0:
            # On prend la variable associée au premier littéral
            var_index = abs(clause[0]) - 1
            if list_var[var_index] == None:
                litteral_choisi = clause[0]
                break
    
    # Si aucun littéral non assigné n'est trouvé, la formule est True (déjà géré par la vérification formule vide si la liste de variables est complète)
    if litteral_choisi is None:
         # Double vérification finale avec évaluation complète (seulement pour la robustesse)
         if evaluer_cnf(formule, list_var) == True:
            return True, list_var
         else:
            return False, None # Ne devrait pas arriver si les étapes sont correctes
            
    var_index = abs(litteral_choisi) - 1
    
    # Cas 1 : Assignation à True (choix du littéral choisi)
    list_var_true = list_var[:]
    list_var_true[var_index] = (litteral_choisi > 0) 
    
    sat_true, sol_true = dpll(formule, list_var_true)
    if sat_true:
        return True, sol_true

    # Cas 2 : Assignation à False (choix du littéral opposé)
    list_var_false = list_var[:]
    list_var_false[var_index] = (litteral_choisi < 0) 
    
    sat_false, sol_false = dpll(formule, list_var_false)
    if sat_false:
        return True, sol_false

    # Les deux branches ont échoué
    return False, None
</code></pre>` 
    },
    { 
        day: 11, 
        type: 'fact', 
        content: 'Le premier **virus informatique** non expérimental était **Elk Cloner**, créé en 1982 par un lycéen de 15 ans. Il infectait les disquettes Apple II et affichait un petit poème.'
    },
    { 
        day: 12, 
        type: 'img', 
        src: 'https://i.imgflip.com/6r11r.jpg', // Exemple de lien de meme
        alt: 'Meme de développeur stressé', 
        caption: 'Quand j\'évalue une clause et qu\'elle retourne None : **Guess I\'ll die**' 
    },
    { 
        day: 13, 
        type: 'code', 
        content: `
<pre><code class="language-python">
# Fonction utilitaire pour trouver les littéraux unitaires
def trouver_litteraux_unitaires(formule, list_var):
    unitaires = []
    for clause in formule:
        if len(clause) == 1:
            litteral = clause[0]
            var_index = abs(litteral) - 1
            if list_var[var_index] == None:
                unitaires.append(litteral)
    return unitaires
</code></pre>`
    },
    { 
        day: 14, 
        type: 'fact', 
        content: 'Le terme **"bug"** pour désigner une erreur de programmation serait inspiré d\'un véritable insecte. En 1947, un papillon de nuit fut trouvé coincé dans un relais du calculateur **Mark II** à Harvard, provoquant une panne.'
    },
    { 
        day: 15, 
        type: 'img', 
        src: 'https://i.imgflip.com/7123o.jpg', // Exemple de lien de meme
        alt: 'Meme de chat en colère pour un bug', 
        caption: 'Moi après avoir passé 3 heures à débugger une fonction que j\'ai écrite en 5 minutes.' 
    },
    { 
        day: 16, 
        type: 'code', 
        content: `
<pre><code class="language-python">
# Simplification des clauses unitaires (règle d'Unité)
def regle_unite_dpll(formule, list_var):
    while True:
        unitaires = trouver_litteraux_unitaires(formule, list_var)
        if not unitaires:
            break
            
        litteral_unitaire = unitaires[0]
        var_index = abs(litteral_unitaire) - 1
        
        # Le littéral unitaire doit être assigné pour satisfaire la clause
        list_var[var_index] = (litteral_unitaire > 0)
        
        # Mettre à jour la formule avec la nouvelle assignation
        formule = init_formule_simpl_for(formule, list_var)
        
        # Vérification après simplification
        if any(len(clause) == 0 for clause in formule):
            return False, None  # Clause vide, insatisfiable
        if len(formule) == 0:
            return True, list_var # Formule vide, satisfiable
            
    return formule, list_var # Retourne la formule et les variables mises à jour

# Modification de la fonction dpll pour utiliser la règle d'unité
def dpll_avec_unite(formule, list_var):
    # Règle d'Unité (propagation de contrainte)
    result_unite = regle_unite_dpll(formule, list_var)
    if isinstance(result_unite[0], bool): # Si la règle d'unité a déjà trouvé la solution
        return result_unite
        
    formule, list_var = result_unite
    
    # ... Reste de la fonction dpll (vérifications de base et branchement)
    # Vérification : Formule vide (satisfiable)
    if len(formule) == 0:
        return True, list_var

    # Vérification : Clause vide (insatisfiable)
    if any(len(clause) == 0 for clause in formule):
        return False, None
    
    # Choisir un littéral non assigné... (comme dans la fonction dpll précédente)
    litteral_choisi = None
    for clause in formule:
        if len(clause) > 0:
            var_index = abs(clause[0]) - 1
            if list_var[var_index] == None:
                litteral_choisi = clause[0]
                break
                
    if litteral_choisi is None:
        # La formule est satisfiable car elle est vide ou toutes les variables sont assignées et satisfaites
        return True, list_var 
            
    var_index = abs(litteral_choisi) - 1
    
    # Cas 1 : Assignation à True
    list_var_true = list_var[:]
    list_var_true[var_index] = (litteral_choisi > 0) 
    sat_true, sol_true = dpll_avec_unite(formule, list_var_true)
    if sat_true:
        return True, sol_true

    # Cas 2 : Assignation à False
    list_var_false = list_var[:]
    list_var_false[var_index] = (litteral_choisi < 0) 
    sat_false, sol_false = dpll_avec_unite(formule, list_var_false)
    if sat_false:
        return True, sol_false

    return False, None
</code></pre>` 
    },
    { 
        day: 17, 
        type: 'fact', 
        content: 'La toute première adresse électronique (email) a été envoyée par **Ray Tomlinson** en 1971. C\'est lui qui a choisi le caractère **"@"** pour séparer le nom de l\'utilisateur de celui de la machine hôte.'
    },
    { 
        day: 18, 
        type: 'img', 
        src: 'https://i.imgflip.com/5l3o7d.png', // Exemple de lien de meme
        alt: 'Meme "Ça ne marche pas" vs "Ça ne compile pas"', 
        caption: 'Moi : *le code compile et s\'exécute*... Le code en production : **Ça ne marche pas, mais je ne sais pas pourquoi.**' 
    },
    { 
        day: 19, 
        type: 'code', 
        content: `
<pre><code class="language-python">
# Fonction utilitaire pour trouver les littéraux purs
def trouver_litteraux_purs(formule, list_var):
    toutes_apparitions = {}
    
    for clause in formule:
        for litteral in clause:
            var = abs(litteral)
            # S'assurer que la variable n'est pas déjà assignée
            if list_var[var - 1] == None:
                if var not in toutes_apparitions:
                    toutes_apparitions[var] = 0
                
                if litteral > 0: # Apparition positive
                    toutes_apparitions[var] |= 1 # Mettre le premier bit à 1
                else: # Apparition négative
                    toutes_apparitions[var] |= 2 # Mettre le deuxième bit à 1

    littéraux_purs = []
    for var, apparitions in toutes_apparitions.items():
        if apparitions == 1: # Uniquement apparitions positives
            littéraux_purs.append(var) # Assigner à True
        elif apparitions == 2: # Uniquement apparitions négatives
            littéraux_purs.append(-var) # Assigner à False
            
    return littéraux_purs
</code></pre>`
    },
    { 
        day: 20, 
        type: 'fact', 
        content: 'Un ordinateur a besoin de 4 Go de mémoire pour pouvoir gérer la simulation complète d\'une cellule cérébrale d\'une seule seconde. Le cerveau humain contient environ **86 milliards** de neurones.'
    },
    { 
        day: 21, 
        type: 'img', 
        src: 'https://i.imgflip.com/4l35m.jpg', // Exemple de lien de meme
        alt: 'Meme de programmeur qui regarde ses notes', 
        caption: 'Mon code après une nuit blanche vs mes notes pour le comprendre le lendemain.' 
    },
    { 
        day: 22, 
        type: 'code', 
        content: `
<pre><code class="language-python">
# Règle du Littéral Pur
def regle_litt_pur_dpll(formule, list_var):
    while True:
        litteraux_purs = trouver_litteraux_purs(formule, list_var)
        if not litteraux_purs:
            break
            
        litteral_pur = litteraux_purs[0]
        var_index = abs(litteral_pur) - 1
        
        # Le littéral pur est assigné pour le retirer de la formule sans risque
        list_var[var_index] = (litteral_pur > 0)
        
        # Mettre à jour la formule avec la nouvelle assignation
        formule = init_formule_simpl_for(formule, list_var)
        
        # Vérification après simplification
        if any(len(clause) == 0 for clause in formule):
            return False, None  # Clause vide, insatisfiable
        if len(formule) == 0:
            return True, list_var # Formule vide, satisfiable
            
    return formule, list_var # Retourne la formule et les variables mises à jour
</code></pre>` 
    },
    { 
        day: 23, 
        type: 'fact', 
        content: 'La puissance de calcul de votre smartphone est probablement supérieure à celle utilisée pour envoyer les astronautes sur la Lune avec la mission **Apollo 11**.'
    },
    { day: 24, type: 'text', content: 'Joyeux Noël ! 🎁💻' }
];


// --- 2. CONFIGURATION DES BLAGUES (TYPEWRITER) ---
const jokes = [
    "Ctrl+C, Ctrl+V : La base de la connaissance.",
    "Toc Toc. Qui est là ? *Une très longue pause*... C'est Internet Explorer.",
    "Il y a 10 types de personnes : ceux qui comprennent le binaire, et les autres.",
    "Un développeur ne descend pas le métro, il libère la RAM.",
    "Pourquoi les développeurs détestent la nature ? Trop de bugs.",
    "Hardware : Ce qu'on peut frapper. Software : Ce qu'on ne peut que maudire.",
    "/* Pas de commentaire */",
    "Pourquoi JavaScript déteste les montagnes ? Parce qu'il a trop de problèmes de scope.",
    "J'ai voulu faire une blague sur UDP… mais je ne sais pas si tu la recevras.",
    "Un SQL entre dans un bar... il voit deux tables et dit : « Je peux me joindre à vous ? »",
    "Pourquoi Python n'aime pas les disputes ? Parce qu'il évite les arguments.",
    "Quand un dev dit qu’il va tout réécrire from scratch… fuis.",
    "Pourquoi les programmeurs préfèrent le dark mode ? Parce que la lumière attire les bugs.",
    "Mon code marche. Je n’y touche plus. Jamais. *JAMAIS*.",
    "Le jour où ton code marche du premier coup… redémarre ton PC, c’est sûrement un bug.",
    "Pourquoi les développeurs n'aiment pas les anniversaires ? Trop d'exceptions à gérer.",
    "Mon code n’a pas de bug. Il développe des fonctionnalités surprises.",
    "Un programmeur entre dans une boulangerie : « Bonjour, je voudrais un pain… et l’API s’il vous plaît. »",
    "Pourquoi le serveur est tombé ? Il n’avait plus de RAM-enée.",
    "Un dev front dit à un dev back : « Tu me casses mes styles. »",
    "Pourquoi Git est-il dur à comprendre ? Parce que même lui ne sait pas où on en est.",
    "Mon code est propre. Il sent encore la javel du dernier refactor.",
    "Pourquoi les développeurs sont mauvais en cuisine ? Tout finit en boucles infinies.",
    "Une IA entre dans un bar… le bar ferme, le gérant panique.",
    "Pourquoi les devs utilisent des écouteurs ? Pour compiler en silence.",
    "Un bug par jour éloigne le sommeil pour toujours.",
    "Pourquoi les devs adorent les cafés ? Le debug y est plus facile après 3 expressos.",
    "Un dev Docker ne fait jamais la vaisselle : il isole tout dans des containers.",
    "Refactor : le mot poli pour dire « j’ai cassé la moitié du projet mais calme-toi ».",
    "Pourquoi les développeurs aiment les maths ? Elles ne renvoient jamais d’erreur 500.",
    "Un dev explique à son fils : « Dans la vie, tu auras des problèmes. L’important, c’est de savoir les résoudre en production. »",
    "Pourquoi les devs aiment les ascenseurs ? Ça leur rappelle les stacks.",
    "J’ai essayé d’expliquer mon code… j’ai ouvert un ticket pour moi-même.",
    "Pourquoi les devs n’aiment pas parler ? Parce qu’ils préfèrent les commentaires.",
    "Un bug se cache ? Pas grave, il finira par apparaître… en prod.",
    "Mon code n’est pas lent, il prend son temps pour réfléchir.",
    "Pourquoi les devs ne jouent jamais à cache-cache ? Les logs les trahissent.",
    "Je voulais optimiser mon code, maintenant il ne marche plus. Progression.",
    "Le café n’est pas une boisson, c’est une dépendance fonctionnelle.",
    "Pourquoi j’aime les serveurs ? Ils me laissent pleurer en SSH.",
    "Encore un bug ? Non, c’est une fonctionnalité non documentée.",
    "Je lance un build… suspense, horreur, dépression.",
    "Un dev sans bug, ça n’existe pas. Même dans les légendes.",
    "J’ai demandé à l’IA de coder pour moi. Résultat : 3 fois plus de bugs.",
    "Pourquoi j’écris des tests unitaires ? Pour pleurer plus tôt.",
    "J’ai mis mon code en prod. J’ai aussi rédigé mon testament.",
    "Mon IDE plante plus que moi en hiver.",
    "Un dev heureux ? Fake news.",
    "J’éteins et je rallume ma vie 10 fois par jour.",
    "« Ça marche sur ma machine » est mon mantra sacré.",
    "J’ai 99 problèmes… et Git est chacun d’eux.",
    "Quand Dieu a dit « que la lumière soit », j’ai eu une erreur syntaxe.",
    "J’ai tenté de comprendre le code d’un autre dev. Je veux un RTT.",
    "Le backend, c’est comme les toilettes : si tout marche, personne n’en parle.",
    "Pourquoi la doc est toujours vide ? Parce que la vérité fait mal.",
    "Les warnings, c’est pour les faibles.",
    "J’ai trouvé un bug. J’ai corrigé. Trois nouveaux sont apparus. Hydre.",
    "Si un dev sourit, c’est probablement un bug qui vient d’être repoussé.",
    "Pourquoi la prod casse ? Parce qu’elle m’écoute trop.",
    "J’ai testé mon code en prod… pour gagner du temps.",
    "Si le silence est d'or, le debug est un hurlement.",
    "Le scrummaster m’a dit « respire ». Je suis en train de redémarrer.",
    "Un dev n’est jamais en retard. Sa deadline est juste mauvaise.",
    "La compilation, c’est ma séance de méditation forcée.",
    "Pourquoi tout va mal ? Parce que j’ai commit.",
    "Le code legacy est un site archéologique.",
    "Pourquoi les devs sont stressés ? Parce que `rm -rf` existe.",
    "Je rêve en JSON, et je fais des cauchemars en YAML.",
    "J’ai voulu faire une pause. Mon PC a crash.",
    "Un dev dit « je viens de finir »… et le mensonge commence.",
    "Mon patron m’a dit « fais simple ». J’ai fait compliqué par réflexe.",
    "La vie est courte, sauf quand tu attends une compilation C++.",
    "Pourquoi les devs aiment les erreurs 404 ? Elles sont honnêtes.",
    "Si tu comprends mon code, je te dois un café.",
    "J’ai vu un bug courir. Je l’ai laissé vivre.",
    "La solution idéale ? Elle n’existe que dans StackOverflow.",
    "Mon code est tellement sale qu’il mérite un nettoyage de printemps.",
    "J’ai essayé d’optimiser. Maintenant j’ai un souvenir du projet.",
    "Pourquoi les serveurs tombent ? Pour montrer qu’ils existent.",
    "J’ai corrigé un bug critique. Maintenant j’ai un bug apocalyptique.",
    "Pourquoi j’utilise VSCode ? Parce qu’il pleure avec moi.",
    "Les devops disent « tout est automatisé ». Le chaos aussi.",
    "Je ne dors pas. Je compile.",
    "En debug, je trouve la vérité. Et je la regrette."
];


// --- 3. EFFET MATRIX + NEIGE + EMOJIS (BACKGROUND) ---
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

// Les caractères qui vont tomber : Code + Neige + Emojis demandés
const chars = '01{}<>?[]/\\|console.log"❄❅❆🍑🍆'; 
const charArray = chars.split('');
const fontSize = 16;
const columns = width / fontSize;
const drops = [];

for(let x = 0; x < columns; x++) {
    drops[x] = Math.random() * height; // Départ aléatoire
}

function drawMatrix() {
    // Fond noir très transparent pour l'effet de traînée
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, width, height);

    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Couleur changeante selon le caractère
        if (text === '🍑' || text === '🍆') {
            ctx.fillStyle = '#ff69b4'; // Rose/Violet pour les emojis spéciaux
        } else if (text === '❄' || text === '❅') {
            ctx.fillStyle = '#fff'; // Blanc pour la neige
        } else {
            ctx.fillStyle = '#0f0'; // Vert Matrix pour le code
        }

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if(drops[i] * fontSize > height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

// Redimensionnement fenêtre
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});


// --- 4. EFFET TYPEWRITER (HEADER) ---
const typeTextElement = document.getElementById('typewriter-text');
let jokeIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function typeWriter() {
    // Utilise la variable "jokes" corrigée
    const currentJoke = jokes[jokeIndex];
    
    if (isDeleting) {
        // Effacer
        typeTextElement.textContent = currentJoke.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50; // Plus rapide pour effacer
    } else {
        // Écrire
        typeTextElement.textContent = currentJoke.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100; // Vitesse normale de frappe
    }

    if (!isDeleting && charIndex === currentJoke.length) {
        // Fin de la phrase, pause
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Phrase effacée, phrase suivante
        isDeleting = false;
        jokeIndex = (jokeIndex + 1) % jokes.length;
        typeSpeed = 500;
    }

    setTimeout(typeWriter, typeSpeed);
}
document.addEventListener('DOMContentLoaded', typeWriter);


// --- 5. LOGIQUE CALENDRIER (Similaire précédent mais adapté) ---
const today = new Date();
const currentDay = today.getDate(); 
const currentMonth = today.getMonth(); // 11 = Décembre
// DEBUG : Décommentez pour tester comme si on était le 25 Décembre
// const currentMonth = 11; const currentDay = 25;

const isDecember = currentMonth === 11; 
const calendarContainer = document.getElementById('advent-calendar');
const modal = document.getElementById("content-modal");
const modalBody = document.getElementById("modal-body");
const modalTitle = document.getElementById("modal-title");
const closeModal = document.querySelector(".close-btn");

function createCalendar() {
    for (let i = 1; i <= 24; i++) {
        const door = document.createElement('div');
        door.className = 'door';
        door.dataset.day = i;
        door.innerHTML = `<span>${i}</span>`;

        const isEnabled = isDecember && i <= currentDay;
        const isOpened = localStorage.getItem(`door_${i}_opened`) === 'true';

        if (isOpened) {
            door.classList.add('opened');
            door.innerHTML = `<span>Ouvert</span>`; // Texte change
            door.addEventListener('click', () => openDoor(i, true));
        } else if (isEnabled) {
            door.classList.add('enabled');
            door.addEventListener('click', () => openDoor(i, false));
        } else {
            door.classList.add('disabled');
            door.addEventListener('click', () => alert("Accès refusé. Firewall actif jusqu'au " + i + " décembre ! ⛔"));
        }
        calendarContainer.appendChild(door);
    }
}

function openDoor(day, replay) {
    const content = doorContents.find(c => c.day === day);
    const door = document.querySelector(`.door[data-day="${day}"]`);
    
    // Si c'est la première ouverture
    if (!replay) {
        door.classList.add('opened');
        door.innerHTML = `<span>Ouvert</span>`; // Changement texte + police (via CSS)
        localStorage.setItem(`door_${day}_opened`, 'true');
    }

    // Contenu Modale
    modalTitle.innerText = `> LOG: JOUR_${day}`;
    modalBody.innerHTML = '';
    
    if (!content) {
        modalBody.innerHTML = `<p>404 Not Found: Ajoutez du contenu dans le JS !</p>`;
    } else {
        if (content.type === 'img' || content.type === 'gif') {
            modalBody.innerHTML = `<img src="${content.src}" alt="Noel"><p>${content.caption || ''}</p>`;
        } else if (content.type === 'video') {
            modalBody.innerHTML = `<video controls autoplay><source src="${content.src}" type="video/mp4"></video><p>${content.caption || ''}</p>`;
        } else if (content.type === 'code') { // <-- Logique simplifiée pour Highlight.js
            // Highlight.js a besoin du <pre><code> brut
            modalBody.innerHTML = content.content; 
        } else {
            // Type 'text' par défaut
            modalBody.innerHTML = `<p style="font-size:1.2em; border-left: 3px solid var(--neon-green); padding-left:10px;">${content.content}</p>`;
        }
    }
    
    modal.style.display = 'block';

    // *** APPEL CRUCIAL POUR HIGHLIGHT.JS ***
    // On force la coloration du nouveau contenu après son injection
    if (content && content.type === 'code' && typeof hljs !== 'undefined') {
        hljs.highlightAll(); 
    }
}

closeModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; }

createCalendar();
