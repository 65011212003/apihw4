import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  movie: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) { }

  ngOnInit() {
    const imdbID = this.route.snapshot.paramMap.get('imdbID');
    if (imdbID !== null) {
      this.fetchMovieDetails(imdbID);
    }
  }

  goBack(): void {
    this.location.back();
  }

  fetchMovieDetails(imdbID: string) {
    const apiKey = '9e75d7ed';
    const apiUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;

    // Make the API call
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data.Response === 'True') {
          // Handle the response here
          this.movie = data;
        } else {
          console.error('Unexpected API response:', data.Error);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
}