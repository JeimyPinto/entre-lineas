import { BaseEntity, Classifiable } from '../shared/base';

/**
 * User Profile Entity
 * 
 * Extends BaseEntity with user-specific fields.
 * name is required (not nullable) to satisfy BaseEntity
 */
export interface UserProfile extends BaseEntity, Classifiable {
  id: number;
  email: string;
  name: string;  // Required by BaseEntity
  role: string;
  active?: boolean;
}

/**
 * User Domain Class
 * 
 * Encapsulates user business logic.
 */
export class User {
  private constructor(
    public readonly id: number,
    public readonly email: string,
    public readonly name: string | null,
    public readonly role: string,
    public readonly active: boolean = true
  ) {}

  static fromData(data: UserProfile): User {
    return new User(
      data.id,
      data.email,
      data.name,
      data.role,
      data.active ?? true
    );
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  getDisplayName(): string {
    return this.name ?? this.email;
  }

  isActive(): boolean {
    return this.active;
  }
}