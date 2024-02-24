"use client"
import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '@/lib/api';

export default function Page() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const newUsers = await getLeaderboard();
            setUsers(newUsers);
        };

        fetchUsers();
    }, []);

    return (
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Coins</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.username}</td>
                        <td>{user.coins}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}