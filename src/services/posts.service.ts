// COMPONENT TYPE: Facade Service
// SECTION: HTTP and Data Access
//
// ROLE:
// - Provide posts data access layer
// - Handle HTTP CRUD operations for posts
// - Abstract API communication from components
// - Demonstrate Service Facade pattern benefits
//
// PATTERNS USED:
// - Service Facade pattern
// - Observable-based HTTP responses
// - Typed interfaces for data contracts
// - CRUD operation methods
//
// NOTES FOR CONTRIBUTORS:
// - WHY USE A SERVICE FACADE?
//   1. Separation of concerns: Components don't know WHERE/HOW data is fetched
//   2. Reusability: Multiple components can use the same service
//   3. Testability: Easy to mock in tests, components only test UI
//   4. Maintainability: API changes affect only the service
//   5. Type safety: Service defines data interfaces, TypeScript ensures correct usage
//
// - Add error handling and loading states for production
// - Consider adding caching for frequently accessed data
// - Keep HTTP logic here, not in components

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Interface for a Post from JSONPlaceholder API
 */
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
@Injectable({
  providedIn: 'root', // Singleton throughout the app
})
export class PostsService {
  // Dependency Injection of HttpClient
  private http = inject(HttpClient);

  // Base API URL (in a real app, would come from environment)
  private readonly API_URL = 'https://jsonplaceholder.typicode.com/posts';

  /**
   * Retrieve all posts (GET)
   *
   * @returns Observable<Post[]> - Data stream that emits the posts array
   */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.API_URL);
  }

  /**
   * Retrieve a single post by ID (GET)
   *
   * @param id - ID of the post to retrieve
   * @returns Observable<Post> - Stream that emits the requested post
   */
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.API_URL}/${id}`);
  }

  /**
   * Create a new post (POST)
   *
   * @param post - Post data to create (without id)
   * @returns Observable<Post> - Stream that emits the created post with id
   */
  createPost(post: Omit<Post, 'id'>): Observable<Post> {
    return this.http.post<Post>(this.API_URL, post);
  }

  /**
   * Update an existing post (PUT)
   *
   * @param id - ID of the post to update
   * @param post - New post data
   * @returns Observable<Post> - Stream that emits the updated post
   */
  updatePost(id: number, post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.API_URL}/${id}`, post);
  }

  /**
   * Delete a post (DELETE)
   *
   * @param id - ID of the post to delete
   * @returns Observable<void> - Stream that completes when deletion succeeds
   */
  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
