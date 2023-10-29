import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { finalize } from 'rxjs';
import { Show } from 'src/app/shared/models/show';
import { TvshowsService } from '../../services/tvshows.service';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class ShowDetailComponent  implements OnInit {

  private tvshowsService = inject(TvshowsService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)
  isLoading = false
  details!: Show

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']
    this.fetchShowDetails(id)
  }

  fetchShowDetails(id: number): void {
    this.isLoading = true
    this.tvshowsService.getShowDetails(id).pipe(
      finalize(() => {
       this.isLoading = false
      })
    ).subscribe(details => {
      this.details = details as Show
    })
  }

  goBack() {
    this.router.navigate(['../'])
  }
}
