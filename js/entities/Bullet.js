class Bullet extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'bullet');
    }

    // Metodo per "sparare" il proiettile
    fire(x, y, direction) {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        // Avvia l'animazione del proiettile
        this.anims.play('bullet_anim', true);

        // Imposta la velocità del proiettile in base alla direzione
        const speed = 400;
        this.setVelocityX(speed * direction);
    }

    // Metodo speciale di Phaser che viene eseguito ad ogni frame
    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (this.x < 0 || this.x > this.scene.physics.world.bounds.width) {
            this.setActive(false);
            this.setVisible(false);
            this.destroy();
        }
    }
}