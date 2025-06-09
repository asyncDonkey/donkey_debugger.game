class Level1Scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Level1Scene' });
        this.lastFired = 0;
    }

    create() {
        // --- MAPPA E LAYER ---
        const map = this.make.tilemap({ key: 'map1' });
        const tileset = map.addTilesetImage('terrain_tileset', 'tiles');
        const platformsLayer = map.createLayer('platforms', tileset, 0, 0);
        platformsLayer.setCollisionByProperty({ collides: true });

        // --- GIOCATORE ---
        this.player = this.physics.add.sprite(100, 100, 'donkey');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        // --- PROIETTILI ---
        this.bullets = this.physics.add.group({ classType: Bullet, runChildUpdate: true });
        
        // --- NEMICI ---
        this.enemies = this.physics.add.group({ classType: PixelProwler, runChildUpdate: true });
        // Posizioniamo un nemico sulla mappa per testare
        const enemy = this.enemies.get();
        if (enemy) {
            enemy.spawn(400, 150); // Mettilo in una posizione visibile
        }

        // --- COLLISIONI ---
        this.physics.add.collider(this.player, platformsLayer);
        this.physics.add.collider(this.bullets, platformsLayer, (bullet) => bullet.destroy());
        // Aggiungiamo la collisione tra i nemici e le piattaforme
        this.physics.add.collider(this.enemies, platformsLayer);

        // Aggiungiamo le collisioni "overlap" (non solide, ma rilevano il contatto)
        this.physics.add.overlap(this.bullets, this.enemies, this.handleBulletEnemyCollision, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.handlePlayerEnemyCollision, null, this);

        // --- CONTROLLI ---
        this.cursors = this.input.keyboard.createCursorKeys();
        this.shootKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        // --- CAMERA ---
        this.cameras.main.startFollow(this.player, true, 0.08, 0.08);
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // --- ANIMAZIONI ---
        this.anims.create({ key: 'run', frames: this.anims.generateFrameNumbers('donkey', { start: 1, end: 4 }), frameRate: 10, repeat: -1 });
        this.anims.create({ key: 'jump', frames: [{ key: 'donkey', frame: 2 }], frameRate: 20 });
        this.anims.create({ key: 'bullet_anim', frames: this.anims.generateFrameNumbers('bullet', { start: 0, end: 3 }), frameRate: 15, repeat: -1 });

        // Aggiungiamo l'animazione del nemico (USA I TUOI VALORI!)
        this.anims.create({
    key: 'prowler_walk',
    frames: this.anims.generateFrameNumbers('pixel_prowler', { start: 0, end: 3 }),
    frameRate: 8,
    repeat: -1
});

        
    }

    // --- FUNZIONI DI GESTIONE DELLE COLLISIONI ---
    handleBulletEnemyCollision(bullet, enemy) {
        // Per ora, distruggiamo entrambi
        bullet.destroy();
        enemy.destroy();
        // In futuro, qui aggiungeremo punti, suoni, esplosioni, etc.
    }

    handlePlayerEnemyCollision(player, enemy) {
        // Per ora, il giocatore diventa rosso per un istante per mostrare che è stato colpito
        player.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            player.clearTint();
        });
        // In futuro, qui gestiremo la perdita di vite, invincibilità temporanea, etc.
    }

    update(time, delta) {
        // ... tutta la logica di movimento e sparo rimane INVARIATA ...
        const onFloor = this.player.body.onFloor();
        if (this.cursors.left.isDown) { this.player.setVelocityX(-160); this.player.setFlipX(true); if (onFloor) this.player.anims.play('run', true); }
        else if (this.cursors.right.isDown) { this.player.setVelocityX(160); this.player.setFlipX(false); if (onFloor) this.player.anims.play('run', true); }
        else { this.player.setVelocityX(0); if (onFloor) this.player.anims.play('run', true); }
        if (this.cursors.up.isDown && onFloor) { this.player.setVelocityY(-330); }
        if (!onFloor) { this.player.anims.play('jump', true); }
        if (this.shootKey.isDown && time > this.lastFired) { const bullet = this.bullets.get(); if (bullet) { const direction = this.player.flipX ? -1 : 1; const bulletX = this.player.x + (25 * direction); const bulletY = this.player.y; bullet.fire(bulletX, bulletY, direction); this.lastFired = time + 250; } }
    }
}