const { createApp } = Vue

createApp({

    data(){
        return{

            playing: false,

            nombre: "Mi Princesa",

            mostrarCarta: false,

            // IMPORTANTE: usar formato local (Año, Mes-1, Día, Hora, Minuto, Segundo)
            fechaInicio: new Date(2023, 5, 27, 0, 0, 0),

            fechaActual: "",

            tiempo:{
                dias: 0,
                horas: 0,
                minutos: 0,
                segundos: 0
            }

        }
    },

    methods:{
        toggleCarta(){
            this.mostrarCarta = !this.mostrarCarta
        },
        toggleMusic() {

        const audio = this.$refs.audio;

            if (!this.playing) {
                audio.play();
                this.playing = true;
            } else {
                audio.pause();
                this.playing = false;
            }
        },

        actualizarTiempo(){

            const ahora = new Date()

            // fecha actual formateada exacta en español México
            this.fechaActual = ahora.toLocaleDateString('es-MX', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            })

            let diff = ahora.getTime() - this.fechaInicio.getTime()

            if(diff < 0) diff = 0

            const segundosTotales = Math.floor(diff / 1000)

            this.tiempo.dias = Math.floor(segundosTotales / 86400)

            this.tiempo.horas = Math.floor((segundosTotales % 86400) / 3600)

            this.tiempo.minutos = Math.floor((segundosTotales % 3600) / 60)

            this.tiempo.segundos = segundosTotales % 60

        }

    },

    mounted(){

        this.actualizarTiempo()

        // actualizar cada segundo (exacto)
        setInterval(this.actualizarTiempo, 1000)

    }

}).mount("#app")
