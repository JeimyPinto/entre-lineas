export interface UserProfile {
  id: number;
  email: string;
  name: string | null;
  role: string;
  active?: boolean;
}

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
}
