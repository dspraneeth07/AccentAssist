
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Download, Users, Eye, EyeOff } from "lucide-react";
import { credentialsStore } from "@/data/credentials";

const UserCredentialsViewer = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [showPasswords, setShowPasswords] = useState(false);

  useEffect(() => {
    // Access the private users array through reflection
    const store = credentialsStore as any;
    const storedData = localStorage.getItem('qwixaccent_users');
    if (storedData) {
      try {
        setUsers(JSON.parse(storedData));
      } catch (error) {
        console.error('Failed to load users:', error);
      }
    }
  }, []);

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Username', 'Password', 'Phone'];
    const csvContent = [
      headers.join(','),
      ...users.map(user => [
        `"${user.name}"`,
        `"${user.email}"`,
        `"${user.username}"`,
        `"${user.password}"`,
        `"${user.phone}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'qwixaccent_users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-6 h-6 text-blue-600" />
          <CardTitle className="text-2xl font-bold text-gray-800">User Credentials Database</CardTitle>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowPasswords(!showPasswords)}
            className="flex items-center gap-2"
          >
            {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showPasswords ? 'Hide' : 'Show'} Passwords
          </Button>
          <Button onClick={exportToCSV} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No users registered yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-purple-50">
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Username</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Password</th>
                  <th className="border border-gray-300 px-4 py-2 text-left font-semibold">Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                    <td className="border border-gray-300 px-4 py-2">
                      {showPasswords ? user.password : '••••••••'}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserCredentialsViewer;
