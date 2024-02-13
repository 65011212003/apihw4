import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  movies: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  pageSize: number = 10; // Set the desired number of movies per page
  totalResults: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Array of movie titles
    const movieTitles = [
      'Inception',
      'The Dark Knight',
      'Pulp Fiction',
      'The Shawshank Redemption',
      'Fight Club',
      'The Matrix',
      'Forrest Gump',
      'The Godfather',
      'Interstellar',
      'The Lord of the Rings: The Fellowship of the Ring'
    ];

    // Fetch movies for the selected titles
    movieTitles.forEach((title) => {
      this.fetchMoviesByTitle(title);
    });
  }

  search() {
    if (this.searchQuery.trim() !== '') {
      this.currentPage = 1; // Reset to the first page when performing a new search
      this.searchMoviesByTitle(this.searchQuery);
    }
  }

  searchMoviesByTitle(query: string) {
    const apiKey = '9e75d7ed';
    const apiUrl = `https://www.omdbapi.com/?s=${query}&page=${this.currentPage}&apikey=${apiKey}`;

    // Make the API call
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data.Response === 'True') {
          // Handle the response here
          this.movies = data.Search;
          this.totalResults = parseInt(data.totalResults, 10);
        } else {
          console.error('Unexpected API response:', data.Error);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  fetchMoviesByTitle(title: string) {
    const apiKey = '9e75d7ed';
    const apiUrl = `https://www.omdbapi.com/?t=${title}&apikey=${apiKey}`;

    // Make the API call
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data.Response === 'True') {
          // Handle the response here, push the movie data into your 'movies' array
          this.movies.push(data);
        } else {
          console.error('Unexpected API response:', data.Error);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  loadPage(page: number) {
    if (this.searchQuery.trim() !== '') {
      this.currentPage = page;
      this.searchMoviesByTitle(this.searchQuery);
    }
  }

  getPages(): number[] {
    const totalPages = Math.ceil(this.totalResults / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}
