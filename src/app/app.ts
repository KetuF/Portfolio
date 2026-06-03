import { Component, CUSTOM_ELEMENTS_SCHEMA, signal, ViewChildren, ElementRef, QueryList} from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from "gsap";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from '@studio-freight/lenis';

@Component({
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true, 
  imports: [CommonModule,],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');

  private lenis!: Lenis;
  @ViewChildren('panel') panels!: QueryList<ElementRef>;
  @ViewChildren('imgRef') images!: QueryList<ElementRef>;
  @ViewChildren('textRef') texts!: QueryList<ElementRef>;

  ngOnInit() {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }
  
  ngAfterViewInit(): void {

    setTimeout(() => {
      window.scrollTo({
        top: 400,
        behavior: 'instant'
      });
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }, 500);
    }, 100);

    // MANEJO DEL SCROLL
    this.lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    this.lenis.stop();

    // PANTALLA NEGRA DE INICIO
    gsap.to(".LogoPantalla", {
      opacity: 1,
      scale: 1,
      duration: 2,
      ease: "power2.Inout",
      onComplete: () => {
        gsap.to("#introScreen", {
          filter: "blur(8px)",
          opacity: 0,
          duration: 1,
          delay: 1,
          onComplete: () => {
            const elem = document.getElementById('introScreen');
            if (elem){ elem.remove()};
            this.lenis.start();
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflowY = 'scroll';
          }
        });
      }
    });

    // SCROLL SUAVE
    document.addEventListener('touchmove', (e) => {
      e.preventDefault();
    }, { passive: false });
    
    document.addEventListener('wheel', (e) => {
      e.preventDefault();
    }, { passive: false });

    // TEXTO
    gsap.fromTo(".NosotrosTexto .parrafo",{
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.4,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".NosotrosTexto",
        start: "top bottom",
        end:"bottom 60%",
        scrub: true,
        markers: false
      }
    });
    gsap.fromTo(".TrabajoTexto .ParrafoTrabajo",{
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.4,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".TrabajoTexto",
        start: "top bottom",
        end:"bottom 60%",
        scrub: true,
        markers: false
      }
    });
    gsap.fromTo(".VictoriasWrapper .Victorias",{
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.6,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".VictoriasWrapper",
        start: "top bottom",
        end:"bottom 50%",
        scrub: true,
        markers: false
      }
    });
        gsap.fromTo(".VictoriasWrapper2 .Victorias2",{
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.6,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".VictoriasWrapper2",
        start: "top bottom",
        end:"bottom 50%",
        scrub: true,
        markers: false
      }
    });
        gsap.fromTo(".VictoriasWrapper3 .Victorias3",{
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.6,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".VictoriasWrapper3",
        start: "top bottom",
        end:"bottom 50%",
        scrub: true,
        markers: false
      }
    });
    gsap.fromTo(".TrabajoTexto2 .ParrafoTrabajo2",{
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.4,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".TrabajoTexto2",
        start: "top bottom",
        end:"bottom 60%",
        scrub: true,
        markers: false
      }
    });
const mm = gsap.matchMedia();


// ===== DESKTOP =====
mm.add("(min-width: 769px)", () => {

  gsap.fromTo(".ContenedorHabilidades img", {
    x: -200,
    opacity: 0
  }, {
    x: 0,
    opacity: 1,
    duration: 1.5,
    stagger: 0.3,
    ease: "sine.inOut",

    scrollTrigger: {
      trigger: ".ContenedorHabilidades",
      start: "top 80%",
      end: "bottom 100%",
      scrub: true,
      markers: false
    }
  });

});
// ===== MOBILE =====
mm.add("(max-width: 768px)", () => {

  gsap.fromTo(".ContenedorHabilidades img", {
    y: 200,
    x: 0,
    opacity: 0
  }, {
    y: 0,
    x: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: "sine.inOut",

    scrollTrigger: {
      trigger: ".ContenedorHabilidades",
      start: "top 95%",
      end: "bottom 100%",
      scrub: true,
      markers: false
    }
  });

});
    gsap.fromTo(".InformacionPersonalTexto .ParrafoInformacionPersonal",{
      y: 100,
      opacity: 0
    }, {
      y: 0,
      opacity: 1,
      duration: 2,
      stagger: 0.4,
      ease: "sine.inOut",
      scrollTrigger: {
        trigger: ".InformacionPersonalTexto",
        start: "top bottom",
        end:"bottom 60%",
        scrub: true,
        markers: false
      }
    });
  }
}
