import { Component, OnInit, AfterViewInit, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

@Component({
  selector: 'app-root',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit {

  protected readonly title = signal('portfolio');

  private lenis!: Lenis;

  // ─── Lifecycle hooks ────────────────────────────────────────────────────────

  ngOnInit(): void {
    // Bloquear scroll mientras carga la intro
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  }

  ngAfterViewInit(): void {
    this.initLenis();
    this.initCursor();
    this.initNavbar();
    this.initRevealOnScroll();
    this.initHamburger();
  }

  // ─── Lenis — scroll suave ───────────────────────────────────────────────────

  private initLenis(): void {
    this.lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      this.lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  // ─── Cursor personalizado ───────────────────────────────────────────────────

  private initCursor(): void {
    const cursor = document.getElementById('cursor');
    const ring   = document.getElementById('cursorRing');

    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
    });

    const animateCursor = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;

      cursor.style.left = `${mx}px`;
      cursor.style.top  = `${my}px`;
      ring.style.left   = `${rx}px`;
      ring.style.top    = `${ry}px`;

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Efecto hover sobre links y botones
    document.querySelectorAll<HTMLElement>('a, button').forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '6px';
        cursor.style.height = '6px';
        ring.style.width    = '56px';
        ring.style.height   = '56px';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '12px';
        cursor.style.height = '12px';
        ring.style.width    = '38px';
        ring.style.height   = '38px';
      });
    });
  }

  // ─── Navbar — clase al hacer scroll ────────────────────────────────────────

  private initNavbar(): void {
    const nav = document.getElementById('navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ─── Hamburger — menú mobile ────────────────────────────────────────────────

  private initHamburger(): void {
    const ham      = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (!ham || !navLinks) return;

    ham.addEventListener('click', () => navLinks.classList.toggle('open'));

    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('open'))
    );
  }

  // ─── Reveal on scroll — IntersectionObserver ───────────────────────────────

  private initRevealOnScroll(): void {
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach((el) => observer.observe(el));
  }
}