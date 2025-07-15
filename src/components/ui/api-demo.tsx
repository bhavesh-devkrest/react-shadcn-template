import { useState } from 'react';
import { useSubmitContactForm } from '../../hooks/api/use-contact';
import { usePost, usePosts } from '../../hooks/api/use-posts';
import { useCreateUser, useDeleteUser, useUpdateUser, useUser, useUsers } from '../../hooks/api/use-users';
import type { ContactFormData, CreateUserRequest, UpdateUserRequest } from '../../types/api';
import { Button } from './button';

const ApiDemo = () => {
    const [selectedUserId, setSelectedUserId] = useState<string>('1');
    const [selectedPostId, setSelectedPostId] = useState<string>('1');

    // Query hooks
    const { data: users, isLoading: usersLoading, error: usersError } = useUsers({ limit: 5 });
    const { data: user, isLoading: userLoading, error: userError } = useUser(selectedUserId);
    const { data: posts, isLoading: postsLoading } = usePosts({ limit: 3 });
    const { data: post, isLoading: postLoading } = usePost(selectedPostId);

    // Mutation hooks
    const createUserMutation = useCreateUser();
    const updateUserMutation = useUpdateUser();
    const deleteUserMutation = useDeleteUser();
    const submitContactMutation = useSubmitContactForm();

    const handleCreateUser = () => {
        const newUser: CreateUserRequest = {
            name: 'John Doe',
            username: 'johndoe',
            email: 'john@example.com',
            phone: '123-456-7890',
        };
        createUserMutation.mutate(newUser);
    };

    const handleUpdateUser = () => {
        if (user) {
            const updatedUser: UpdateUserRequest = {
                id: user.id,
                name: `${user.name} (Updated)`,
            };
            updateUserMutation.mutate(updatedUser);
        }
    };

    const handleDeleteUser = () => {
        if (user) {
            deleteUserMutation.mutate(user.id.toString());
        }
    };

    const handleSubmitContact = () => {
        const contactData: ContactFormData = {
            name: 'Test User',
            email: 'test@example.com',
            subject: 'Test Subject',
            message: 'This is a test message from the API demo.',
        };
        submitContactMutation.mutate(contactData);
    };

    return (
        <div className="space-y-6 p-6 border border-muted rounded-lg">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-primary mb-2">TanStack Query API Demo</h2>
                <p className="text-sm text-muted-foreground">
                    This demo shows TanStack Query in action with real API calls to JSONPlaceholder
                </p>
            </div>

            {/* Users Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Users ({users?.length || 0})</h3>

                {usersLoading && <p className="text-sm text-muted-foreground">Loading users...</p>}
                {usersError && <p className="text-sm text-destructive">Error loading users</p>}

                {users && (
                    <div className="grid gap-2">
                        {users.slice(0, 3).map((u) => (
                            <div
                                key={u.id}
                                className={`p-2 border rounded cursor-pointer transition-colors ${selectedUserId === u.id.toString() ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                                    }`}
                                onClick={() => setSelectedUserId(u.id.toString())}
                            >
                                <p className="font-medium">{u.name}</p>
                                <p className="text-sm text-muted-foreground">{u.email}</p>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex gap-2 flex-wrap">
                    <Button onClick={handleCreateUser} disabled={createUserMutation.isPending} size="sm">
                        {createUserMutation.isPending ? 'Creating...' : 'Create User'}
                    </Button>
                    <Button onClick={handleUpdateUser} disabled={updateUserMutation.isPending || !user} size="sm" variant="outline">
                        {updateUserMutation.isPending ? 'Updating...' : 'Update User'}
                    </Button>
                    <Button onClick={handleDeleteUser} disabled={deleteUserMutation.isPending || !user} size="sm" variant="destructive">
                        {deleteUserMutation.isPending ? 'Deleting...' : 'Delete User'}
                    </Button>
                </div>
            </div>

            {/* Selected User Details */}
            {selectedUserId && (
                <div className="space-y-2">
                    <h4 className="font-medium">Selected User Details</h4>
                    {userLoading && <p className="text-sm text-muted-foreground">Loading user details...</p>}
                    {userError && <p className="text-sm text-destructive">Error loading user details</p>}
                    {user && (
                        <div className="p-3 bg-muted/50 rounded">
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                            <p><strong>Website:</strong> {user.website}</p>
                        </div>
                    )}
                </div>
            )}

            {/* Posts Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Posts ({posts?.length || 0})</h3>

                {postsLoading && <p className="text-sm text-muted-foreground">Loading posts...</p>}

                {posts && (
                    <div className="grid gap-2">
                        {posts.slice(0, 2).map((p) => (
                            <div
                                key={p.id}
                                className={`p-2 border rounded cursor-pointer transition-colors ${selectedPostId === p.id.toString() ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
                                    }`}
                                onClick={() => setSelectedPostId(p.id.toString())}
                            >
                                <p className="font-medium text-sm">{p.title}</p>
                                <p className="text-xs text-muted-foreground">User ID: {p.userId}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Selected Post Details */}
            {selectedPostId && (
                <div className="space-y-2">
                    <h4 className="font-medium">Selected Post Details</h4>
                    {postLoading && <p className="text-sm text-muted-foreground">Loading post details...</p>}
                    {post && (
                        <div className="p-3 bg-muted/50 rounded">
                            <p><strong>Title:</strong> {post.title}</p>
                            <p><strong>Body:</strong> {post.body.substring(0, 100)}...</p>
                        </div>
                    )}
                </div>
            )}

            {/* Contact Form Demo */}
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Contact Form Demo</h3>
                <Button
                    onClick={handleSubmitContact}
                    disabled={submitContactMutation.isPending}
                    size="sm"
                    variant="outline"
                >
                    {submitContactMutation.isPending ? 'Submitting...' : 'Submit Test Contact Form'}
                </Button>
                {submitContactMutation.isSuccess && (
                    <p className="text-sm text-green-600">Contact form submitted successfully!</p>
                )}
                {submitContactMutation.isError && (
                    <p className="text-sm text-destructive">Failed to submit contact form</p>
                )}
            </div>

            {/* Query Status */}
            <div className="text-xs text-muted-foreground space-y-1">
                <p>💡 Open React Query DevTools (bottom-left flower icon) to see query states</p>
                <p>🔄 Data is cached and automatically refetched when stale</p>
                <p>⚡ Mutations automatically update related queries</p>
            </div>
        </div>
    );
};

export default ApiDemo; 