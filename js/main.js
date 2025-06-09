// Configurazione generale del gioco
const config = {
    type: Phaser.AUTO, // Sceglie automaticamente tra WebGL o Canvas
    width: 800,        // Larghezza della finestra di gioco
    height: 600,       // Altezza della finestra di gioco
    parent: 'game-container', // ID del div nel file HTML
    pixelArt: true,    // Fondamentale per non sfocare la pixel art
    physics: {
        default: 'arcade', // Usiamo la fisica Arcade, semplice e veloce
        arcade: {
            gravity: { y: 300 }, // Gravità globale (la ajusteremo)
            debug: false // Metti true per vedere i corpi di collisione
        }
    },
    // Lista delle scene del nostro gioco
    scene: [
    BootScene,
    PreloaderScene,
    Level1Scene // Aggiungi questa riga
]
};

// Creiamo una nuova istanza del gioco con la nostra configurazione
const game = new Phaser.Game(config);