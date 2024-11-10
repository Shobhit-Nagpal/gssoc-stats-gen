import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function Policy({ message }: { message: string }) {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle>Policy Notice</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{message}</p>
      </CardContent>
    </Card>
  );
};
