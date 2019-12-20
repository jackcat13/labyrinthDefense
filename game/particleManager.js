const FIRE_PARTICLE_IMAGE = "game/assets/fireParticle.png";

function ParticleManager(cxt) {

    var particles = new Array();
    var context = cxt;

    var fireParticle = new Image();
    fireParticle.src = FIRE_PARTICLE_IMAGE;

    var particle = function (x, y, width, height, speed, gravity, life) {

        var angle = Math.floor(Math.random() * 360);
        var radians = angle * Math.PI / 180;

        return {
            // Coordonées en x et y de la dernière position affichée
            x: x,
            y: y,
            // Hauteur et largeur de la particule en pixels
            width: width,
            height: height,
            // Vitesse de déplacement de la particule
            speed: speed,
           // Durée de vie de la particule
            life: life,
           // Valeur de la gravitée appliquée sur les particules
            gravity: gravity,
            // Compteur de rafraichissement
            moves: 0,
            // Déplacement en X
            xunits: Math.cos(radians) * speed,
            // Déplacement en Y
            yunits: Math.sin(radians) * speed
        }
    }

    this.createExplosion = function (posX, posY, particleSize, explosionSize, lifetime, speed, gravity) {

        // On calcule les coordonées où dessiner la particule afin de la centrer sur la position demandée
        posX = posX - particleSize * .5;
        posY = posY - particleSize * .5;
    
        var speed = particleSize * speed * .01;
    
        for (var i = 1; i < explosionSize; i++) {
            for (var j = 0; j < (10 * i); j++) {
                particles.push(particle(posX, posY, particleSize, particleSize, i * speed, gravity, lifetime));
            }
        }
    }

    this.draw = function () {
        var leavingParticles = [];
        for (var i = particles.length - 1; i >= 0; i--) {
            particles[ i ].moves++;
            particles[ i ].x += particles[ i ].xunits;
            particles[ i ].y += particles[ i ].yunits + (particles[ i ].gravity * particles[ i ].moves);
    
            if (particles[ i ].moves < particles[ i ].life) {
                leavingParticles.push(particles[ i ]);
                context.globalAlpha = 5 / (particles[ i ].moves);
                context.drawImage(fireParticle, Math.floor(particles[ i ].x), Math.floor(particles[ i ].y), particles[ i ].width, particles[ i ].height);
                context.globalAlpha = 1;
            }
        }
        particles = leavingParticles;
    }
}