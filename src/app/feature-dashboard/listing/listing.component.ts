import { CommonModule } from '@angular/common'
import { Component, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { Router, RouterModule } from '@angular/router'
import { IonicModule, RefresherCustomEvent } from '@ionic/angular'
import { finalize } from 'rxjs'
import { Show } from 'src/app/shared/models/show'
import { ThemeComponent } from 'src/app/shared/theme/theme.component'

import { TvshowsService } from '../../services/tvshows.service'


interface SearchItem {
  rating: number;
  show: Show;
}

@Component({
  selector: 'app-listing',
  templateUrl: 'listing.component.html',
  styleUrls: ['listing.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    ThemeComponent,
  ],
})
export class ListingComponent {
  shows: Record<string, Show[]> = {}
  allShows: Show[] = []
  searchResults: SearchItem[] = []
  uniqueGenres: Set<string> = new Set()
  genres: string[] = []

  private tvshowsService = inject(TvshowsService)
  private router = inject(Router)

  ngOnInit(): void {
    this.fetchShows()
  }

  refresh(ev: any) {
    setTimeout(() => {
      ;(ev as RefresherCustomEvent).detail.complete()
    }, 3000)
  }

  fetchShows(event: any = null): void {
    const query = event?.target.value.toLowerCase()
    this.tvshowsService
      .getShows(query)
      .pipe(finalize(() => {}))
      .subscribe((data) => {
        if (query && query !== '') {
          const filteredResults = data.filter((result) => result.score >= 0.5)
          this.searchResults = filteredResults
        } else {
          this.allShows = data
          this.searchResults = []
          this.extractGenres()
        }
      })
  }

  showsByGenre(genre: string): any[] {
    return this.allShows
      .sort((a, b) => b.rating.average - a.rating.average)
      .filter((show) => show.genres.includes(genre))
  }

  extractGenres(): void {
    this.allShows.forEach((show) => {
      show.genres.forEach((genre: string) => {
        this.uniqueGenres.add(genre)
      })
    })
    this.genres = Array.from(this.uniqueGenres)
  }

  goDetail(id: string) {
    this.router.navigate(['show', id])
  }
}
