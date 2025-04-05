
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlusCircle, Users, TrendingUp, ShoppingBag } from 'lucide-react';

const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const BusinessDashboard = () => {
  return (
    <div className="space-y-6 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Business Dashboard</h1>
        <Button className="bg-bizconnect-orange hover:bg-bizconnect-orange/90">
          <PlusCircle className="mr-2 h-4 w-4" /> Create Ad
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6%</div>
            <p className="text-xs text-muted-foreground">+0.8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products Listed</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Audience Growth</CardTitle>
          <CardDescription>Followers gained over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#FF7A00" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Ad Campaigns</CardTitle>
            <CardDescription>Your ad performance at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">Summer Sale Promotion</p>
                  <p className="text-sm text-muted-foreground">Jun 15 - Jun 30</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-bizconnect-orange">4,231</p>
                  <p className="text-sm text-muted-foreground">Impressions</p>
                </div>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium">New Product Launch</p>
                  <p className="text-sm text-muted-foreground">May 10 - May 24</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-bizconnect-orange">3,182</p>
                  <p className="text-sm text-muted-foreground">Impressions</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">Flash Sale Weekend</p>
                  <p className="text-sm text-muted-foreground">Apr 22 - Apr 24</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-bizconnect-orange">2,845</p>
                  <p className="text-sm text-muted-foreground">Impressions</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Tools to help grow your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Post
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ShoppingBag className="mr-2 h-4 w-4" /> Add New Product
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" /> Find Collaborations
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BusinessDashboard;
