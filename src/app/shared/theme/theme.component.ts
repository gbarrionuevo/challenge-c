import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ThemeComponent  implements OnInit {
  themeToggle = false;

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.setThemeBasedOnPreference(prefersDark.matches);
    prefersDark.addEventListener('change', event => this.setThemeBasedOnPreference(event.matches));
  }

  setThemeBasedOnPreference(isDark: boolean) {
    this.themeToggle = isDark;
    this.updateThemeClass(isDark);
  }

  toggleChange(event: { detail: { checked: boolean; }; }) {
    this.updateThemeClass(event.detail.checked);
  }

  updateThemeClass(shouldAdd: boolean) {
    document.body.classList.toggle('dark', shouldAdd);
  }

}
