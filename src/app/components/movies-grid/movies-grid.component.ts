// import { Component, OnInit } from '@angular/core';
// import { MoviesService } from '@/app/services';
// import { Movie } from '@/app/interfaces';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-movies-grid',
//   standalone: true,
//   imports: [],
//   templateUrl: './movies-grid.component.html',
//   styleUrl: './movies-grid.component.css'
// })
// export class MoviesGridComponent implements OnInit {

//   constructor(
//     private readonly moviesService: MoviesService,
//     private readonly route: Router
//   ) {}

//   movies: Movie[] = []

//   ngOnInit(): void {
//     this.moviesService.getMovies().subscribe({
//       next: ( movies: Movie[] ) => {
//         this.movies = movies
//       }
//     })
//   }

//   navigateToDetails(id: string){
//     this.route.navigateByUrl(`app/movies/${id}`)
//   }
// }
