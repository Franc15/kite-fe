import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableHeader, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { EmojiHappyIcon, CurrencyDollarIcon, CreditCardIcon, UsersIcon, TrendingUpIcon } from "@heroicons/react/outline";

const data = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 6000 },
  { month: "Mar", revenue: 5500 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6500 },
  { month: "Jun", revenue: 8000 },
  { month: "Jul", revenue: 7500 },
  { month: "Aug", revenue: 9000 },
  { month: "Sep", revenue: 8500 },
  { month: "Oct", revenue: 9500 },
  { month: "Nov", revenue: 10000 },
  { month: "Dec", revenue: 10500 },
];

const recentTransactions = [
  { id: 1, date: "2024-07-15", description: "Payment from Client A", amount: 1500 },
  { id: 2, date: "2024-07-14", description: "Purchase of Supplies", amount: -800 },
  { id: 3, date: "2024-07-12", description: "Monthly Subscription", amount: -50 },
  { id: 4, date: "2024-07-10", description: "Consulting Fee", amount: 2000 },
  { id: 5, date: "2024-07-08", description: "Product Sale", amount: 3000 },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue Card */}
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CurrencyDollarIcon className="h-8 w-8 text-green-500" />
              <span className="text-lg font-bold">$45,000</span>
            </div>
            <div className="flex items-center text-green-500">
              <TrendingUpIcon className="h-5 w-5 mr-1" />
              <span>+10% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Expenses Card */}
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CreditCardIcon className="h-8 w-8 text-red-500" />
              <span className="text-lg font-bold">$25,000</span>
            </div>
            <div className="flex items-center text-red-500">
              <TrendingUpIcon className="h-5 w-5 mr-1" />
              <span>+5% from last month</span>
            </div>
          </CardContent>
        </Card>

        {/* KPI Card 1 */}
        <Card>
          <CardHeader>
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <UsersIcon className="h-10 w-10 text-blue-500" />
            <span className="text-2xl font-bold ml-2">350</span>
          </CardContent>
        </Card>

        {/* KPI Card 2 */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <EmojiHappyIcon className="h-10 w-10 text-yellow-500" />
            <span className="text-2xl font-bold ml-2">95%</span>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Over Time Chart and Recent Transactions Table */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Revenue Over Time Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              {recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.amount > 0 ? `$${transaction.amount}` : `-$${Math.abs(transaction.amount)}`}</TableCell>
                </TableRow>
              ))}
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
