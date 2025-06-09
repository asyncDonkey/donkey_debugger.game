class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    // Non carichiamo nulla qui
    preload() {}

    // Creiamo gli elementi della scena
    create() {
        const centerX = this.game.config.width / 2;
        const centerY = this.game.config.height / 2;

        // Testo che verrà mostrato
        const bootMessages = [
            'Initializing DonkeyDebugger v1.0...',
            'Scanning for system anomalies...',
            'WARNING: Massive corruption detected.',
            'Loading core drivers...',
            'Boot sequence complete. Launching application...'
        ];

        let messageIndex = 0;
        
        const textObject = this.add.text(centerX, centerY, '', { 
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '16px', 
            fill: '#00ff00' 
        }).setOrigin(0.5);

        // Funzione per mostrare i messaggi uno dopo l'altro
        const showNextMessage = () => {
            if (messageIndex < bootMessages.length) {
                textObject.setText(bootMessages[messageIndex]);
                messageIndex++;
            } else {
                // Una volta finiti i messaggi, avviamo la scena del Preloader
                this.scene.start('PreloaderScene');
            }
        };

        // Mostra un nuovo messaggio ogni 1.5 secondi
        this.time.addEvent({
            delay: 1500,
            callback: showNextMessage,
            callbackScope: this,
            loop: true
        });

        // Mostriamo subito il primo messaggio
        showNextMessage();
    }
}