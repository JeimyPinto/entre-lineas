'use client';

import { useState, useEffect } from 'react';
import Button from '@/shared/ui/Button/Button';
import Input from '@/shared/ui/Input/Input';
import Card from '@/shared/ui/Card/Card';
import { 
  FaUserPlus, 
  FaPenToSquare, 
  FaTrashCan, 
  FaArrowRightFromBracket,
  FaUser,
  FaEnvelope,
  FaClock,
  FaCheck,
  FaBan
} from 'react-icons/fa6';
import styles from './users.module.css';

interface User {
  id: string;
  email: string;
  email_confirmed_at: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  app_metadata: {
    provider: string;
  };
  user_metadata: {
    name?: string;
    role?: string;
  };
}

export default function UsersPageClient() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviting, setInviting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/users');
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setUsers(data.users || []);
      }
    } catch (err) {
      setError('Error cargando usuarios');
    } finally {
      setLoading(false);
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail) return;
    
    setInviting(true);
    try {
      const res = await fetch('/api/admin/users/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail }),
      });
      
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        setShowInvite(false);
        setInviteEmail('');
        fetchUsers();
      }
    } catch (err) {
      setError('Error enviando invitación');
    } finally {
      setInviting(false);
    }
  }

  async function handleDelete(userId: string) {
    if (!confirm('¿Estás seguro de eliminar este usuario?')) return;
    
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
      });
      
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        fetchUsers();
      }
    } catch (err) {
      setError('Error eliminando usuario');
    }
  }

  async function handleDisable(userId: string, currentlyDisabled: boolean) {
    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ disabled: currentlyDisabled ? false : true }),
      });
      
      const data = await res.json();
      
      if (data.error) {
        setError(data.error);
      } else {
        fetchUsers();
      }
    } catch (err) {
      setError('Error actualizando usuario');
    }
  }

  function formatDate(dateStr: string | null) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Cargando usuarios...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Usuarios</h1>
          <p className={styles.subtitle}>Gestiona el acceso al panel de control</p>
        </div>
        <Button onClick={() => setShowInvite(true)}>
          <FaUserPlus /> Invitar Usuario
        </Button>
      </header>

      {error && (
        <div className={styles.error}>
          {error}
          <button onClick={() => setError(null)} className={styles.errorClose}>×</button>
        </div>
      )}

      {/* Invite Modal */}
      {showInvite && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Invitar Nuevo Usuario</h2>
            <form onSubmit={handleInvite}>
              <Input
                label="Correo electrónico"
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder=" usuario@ejemplo.com"
                required
              />
              <p className={styles.hint}>
                El usuario recibirá un correo con enlace para crear su contraseña.
              </p>
              <div className={styles.modalActions}>
                <Button type="button" variant="ghost" onClick={() => setShowInvite(false)}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={inviting}>
                  {inviting ? 'Enviando...' : 'Enviar Invitación'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Users Table */}
      <Card className={styles.card}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Estado</th>
              <th>Creado</th>
              <th>Último acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className={styles.empty}>
                  No hay usuarios. Invita al primero.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <div className={styles.userCell}>
                      <div className={styles.avatar}>
                        <FaUser />
                      </div>
                      <div>
                        <div className={styles.email}>{user.email}</div>
                        <div className={styles.meta}>
                          {user.user_metadata?.name && (
                            <span>{user.user_metadata.name}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.badge} ${
                      user.email_confirmed_at ? styles.active : styles.pending
                    }`}>
                      {user.email_confirmed_at ? (
                        <> <FaCheck /> Activo</>
                      ) : (
                        <> <FaClock /> Pendiente</>
                      )}
                    </span>
                  </td>
                  <td>{formatDate(user.created_at)}</td>
                  <td>{formatDate(user.last_sign_in_at)}</td>
                  <td>
                    <div className={styles.actions}>
                      <button 
                        className={styles.actionBtn}
                        onClick={() => handleDelete(user.id)}
                        title="Eliminar usuario"
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}