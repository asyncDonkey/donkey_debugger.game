class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }

    preload() {
        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;

        // Creiamo la barra di caricamento
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(centerX - 160, centerY - 25, 320, 50);

        const loadingText = this.add.text(centerX, centerY - 50, 'Loading...', { 
            fontSize: '20px', fill: '#ffffff' 
        }).setOrigin(0.5);

        const percentText = this.add.text(centerX, centerY, '0%', { 
            fontSize: '18px', fill: '#ffffff' 
        }).setOrigin(0.5);

        // Ascoltiamo gli eventi di caricamento di Phaser
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(centerX - 150, centerY - 15, 300 * value, 30);
            percentText.setText(parseInt(value * 100) + '%');
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
            
            // Messaggio di attesa prima di lanciare il primo livello
            const readyText = this.add.text(centerX, centerY, 'Ready!', { fontSize: '30px', fill: '#00ff00' }).setOrigin(0.5);
            
            // NOTA: Per ora ci fermiamo qui. Nel prossimo step, questa riga
            // lancerà la scena del primo livello, così:
            this.scene.start('Level1Scene');
        });

        // ORA CARICHIAMO GLI ASSET
        // Sostituisci i valori se i tuoi file hanno nomi diversi
        
        // Esempio di caricamento spritesheet:
        // 'donkey' è la chiave che useremo nel codice per riferirci a questo asset.
        // Il frameWidth e frameHeight devono corrispondere alla dimensione di un singolo frame
        // del tuo asinello nello spritesheet.
        this.load.spritesheet('donkey', 'assets/images/asyncDonkey_walk.png', {
             frameWidth: 32, // ESEMPIO: cambia questo valore
             frameHeight: 32 // ESEMPIO: cambia questo valore
        });

        // Carichiamo l'immagine del proiettile
        this.load.spritesheet('bullet', 'assets/images/bitProjectile.png', {
    frameWidth: 24,
    frameHeight: 8

    
});

this.load.spritesheet('pixel_prowler', 'assets/images/pixel_prowler_spritesheet.png', {
    frameWidth: 48,
    frameHeight: 64
});
        
        // Carichiamo il tileset per la mappa
        this.load.image('tiles', 'assets/images/terrain_tileset.png');
        this.load.tilemapTiledJSON('map1', 'assets/maps/levelOne.json');

        // Carichiamo la mappa creata con Tiled (la creeremo nel prossimo step)
        // this.load.tilemapTiledJSON('map1', 'assets/maps/level1.json');
    }

    create() {
        // La logica per avviare il gioco è nell'evento 'complete' del preload
    }
}