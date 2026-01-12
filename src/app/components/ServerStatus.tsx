import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Loader2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { projectId, publicAnonKey } from '/utils/supabase/info';

export function ServerStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  const [details, setDetails] = useState('');

  const checkServer = async () => {
    setStatus('checking');
    setDetails('Checking server connection...');

    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-f0354f00/health`;
      
      console.log('Health check URL:', url);
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      console.log('Health check response:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('Health check data:', data);
        setStatus('online');
        setDetails(`Server is online and responding. Status: ${data.status}`);
      } else {
        setStatus('offline');
        setDetails(`Server responded with status ${response.status}`);
      }
    } catch (err: any) {
      console.error('Health check error:', err);
      setStatus('offline');
      
      if (err.name === 'AbortError') {
        setDetails('Server connection timeout. The server may be starting up or unavailable.');
      } else if (err.message.includes('Failed to fetch')) {
        setDetails('Cannot reach the server. This could mean: 1) The Supabase Edge Function is not deployed yet, 2) Network connectivity issues, or 3) CORS configuration problem.');
      } else {
        setDetails(`Error: ${err.message}`);
      }
    }
  };

  useEffect(() => {
    checkServer();
  }, []);

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {status === 'checking' && <Loader2 className="w-5 h-5 animate-spin text-blue-500" />}
          {status === 'online' && <CheckCircle className="w-5 h-5 text-green-500" />}
          {status === 'offline' && <XCircle className="w-5 h-5 text-red-500" />}
          Server Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className={`p-4 rounded-lg ${
            status === 'online' ? 'bg-green-50 border border-green-200' :
            status === 'offline' ? 'bg-red-50 border border-red-200' :
            'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm ${
              status === 'online' ? 'text-green-700' :
              status === 'offline' ? 'text-red-700' :
              'text-blue-700'
            }`}>
              {details}
            </p>
          </div>

          {status === 'offline' && (
            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div className="text-sm text-yellow-800">
                  <p className="font-semibold mb-2">Troubleshooting Steps:</p>
                  <ol className="list-decimal ml-4 space-y-1">
                    <li>Wait 30-60 seconds for the server to initialize</li>
                    <li>Click "Retry Connection" below</li>
                    <li>Check your internet connection</li>
                    <li>If the problem persists, the Supabase Edge Function may need to be deployed</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={checkServer} disabled={status === 'checking'}>
              {status === 'checking' ? (
                <>
                  <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                  Checking...
                </>
              ) : (
                'Retry Connection'
              )}
            </Button>
          </div>

          <div className="text-xs text-gray-500 space-y-1 mt-4 pt-4 border-t">
            <p><strong>Project ID:</strong> {projectId}</p>
            <p><strong>Server URL:</strong> https://{projectId}.supabase.co/functions/v1/make-server-f0354f00</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
