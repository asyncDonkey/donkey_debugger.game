class PixelProwler extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        // Il 'pixel_prowler' deve corrispondere alla chiave che useremo nel Preloader
        super(scene, x, y, 'pixel_prowler');
    }

    // Questo metodo viene chiamato quando un nemico viene "attivato"
    spawn(x, y) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        // Dagli una velocità iniziale per farlo muovere a sinistra
        this.setVelocityX(-50); 
        
        // Avvia la sua animazione di camminata
        this.anims.play('prowler_walk', true);
    }

    // Metodo eseguito ad ogni frame, qui mettiamo la sua IA
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        // Se il nemico sta toccando un muro, inverti la sua direzione
        if (this.body.blocked.right) {
            this.setVelocityX(-50);
            this.setFlipX(false); // Guarda a sinistra
        } else if (this.body.blocked.left) {
            this.setVelocityX(50);
            this.setFlipX(true); // Guarda a destra
        }
    }
}