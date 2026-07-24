/**
 * 孙若曦个人网站 - 交互功能
 * Scroll reveal, back to top, smooth scroll
 */
(function () {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    createBackToTop();
    initScrollReveal();
    smoothScrollAnchors();
    addHoverEffect();
  }

  // 1. 回到顶部按钮
  function createBackToTop() {
    var btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', '回到顶部');
    btn.style.cssText =
      'position:fixed;bottom:30px;right:30px;width:45px;height:45px;' +
      'border-radius:50%;border:none;background:#6ABF8B;color:#fff;' +
      'font-size:22px;cursor:pointer;opacity:0;transform:translateY(20px);' +
      'transition:opacity 0.3s,transform 0.3s;z-index:999;' +
      'box-shadow:0 2px 10px rgba(0,0,0,0.15);';
    document.body.appendChild(btn);

    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        btn.style.opacity = '1';
        btn.style.transform = 'translateY(0)';
      } else {
        btn.style.opacity = '0';
        btn.style.transform = 'translateY(20px)';
      }
    });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. 滚动显示动画
  function initScrollReveal() {
    var sections = document.querySelectorAll('.container.intro-container, .container.list-container');
    if (sections.length === 0) return;

    sections.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    if (window.IntersectionObserver) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      sections.forEach(function (el) { observer.observe(el); });
    } else {
      sections.forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }
  }

  // 3. 平滑滚动
  function smoothScrollAnchors() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // 4. 项目卡片悬停效果
  function addHoverEffect() {
    document.querySelectorAll('.layout-left').forEach(function (card) {
      card.style.transition = 'transform 0.2s, box-shadow 0.2s';
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
      });
      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      });
    });
  }
})();
