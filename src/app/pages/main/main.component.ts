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

    // Randomly select 10 movie titles
    const randomMovieTitles = this.getRandomElements(movieTitles, 10);

    // Fetch movies for the selected titles
    randomMovieTitles.forEach((title) => {
      this.fetchMoviesByTitle(title);
      // this.searchMovie('Inception');
    });
  }

  search() {
    if (this.searchQuery.trim() !== '') {
      this.searchMoviesByTitle(this.searchQuery);
    }
  }

  searchMoviesByTitle(query: string) {
    const apiKey = '9e75d7ed';
    const apiUrl = `https://www.omdbapi.com/?t=${query}&page=${this.currentPage}&apikey=${apiKey}`;

    // Make the API call
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data.Response === 'True') {
          // Handle the response here
          // If it's the first page, update 'movies' array; otherwise, append to it
          this.movies = this.currentPage === 1 ? data.Search : [...this.movies, ...data.Search];
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

  getRandomElements(arr: any[], n: number) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandomElements: more elements taken than available");

    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }

    return result;
  }

  loadNextPage() {
    if (this.searchQuery.trim() !== '') {
      this.currentPage++;
      this.searchMoviesByTitle(this.searchQuery);
    }
  }


  searchMovie(query: string) {
    const apiKey = '9e75d7ed';
    const apiUrl = `https://www.omdbapi.com/?${this.isImdbId(query) ? 'i' : 't'}=${query}&apikey=${apiKey}`;

    // Make the API call
    this.http.get(apiUrl).subscribe(
      (data: any) => {
        if (data.Response === 'True') {
          // Handle the response here, push the movie data into your 'movies' array
          this.movies = [data];
        } else {
          console.error('Unexpected API response:', data.Error);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  isImdbId(query: string): boolean {
    // IMDb IDs start with 'tt'
    return /^tt\d+$/.test(query);
  }


}
