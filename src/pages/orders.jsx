import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getOrdersMade, getOrdersReceived, getManufacturers, getProductsByManufacturer, addOrder, updateOrderStatus, updateOrderOwnerAndStatus, getSuppliers, getLogisticsCompanies, getOrderHistory } from "@/services/apiService";

const OrdersPage = () => {
  const [ordersReceived, setOrdersReceived] = useState([]);
  const [ordersMade, setOrdersMade] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [products, setProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [logisticsCompanies, setLogisticsCompanies] = useState([]);
  const [newOrder, setNewOrder] = useState({ manufacturer: "", product: "", quantity: "" });
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [orderHistory, setOrderHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  const switchBadge = (status) => {
    switch (status) {
      case "Pending":
        return <Badge variant="warning">{status}</Badge>;
      case "Accepted":
        return <Badge variant="success">{status}</Badge>;
      case "Rejected":
        return <Badge variant="danger">{status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const fetchData = async () => {
    try {
      const [ordersMadeData, ordersReceivedData, manufacturersData, suppliersData, logisticsCompaniesData] = await Promise.all([
        getOrdersMade(),
        getOrdersReceived(),
        getManufacturers(),
        getSuppliers(),
        getLogisticsCompanies()
      ]);

      setOrdersMade(ordersMadeData || []);
      setOrdersReceived(ordersReceivedData || []);
      setManufacturers(manufacturersData || []);
      setSuppliers(suppliersData || []);
      setLogisticsCompanies(logisticsCompaniesData || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch data.");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  const handleManufacturerChange = async (value) => {
    setNewOrder({ ...newOrder, manufacturer: value, product: "" });
    setLoadingProducts(true);
    setProducts([]);
    try {
      const productsData = await getProductsByManufacturer(value);
      setProducts(productsData || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch products.");
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleProductChange = (value) => {
    setNewOrder({ ...newOrder, product: value });
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await addOrder(newOrder);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Failed to create order.");
    }
  };

  const handleChangeOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await updateOrderStatus(orderId, newStatus);
      window.location.reload();
    } catch (err) {
      console.error(err);
      setError("Failed to update order status.");
    }
  };

  const handleChangeOrderStatusAndOwner = async () => {
    try {
      const response = await updateOrderOwnerAndStatus(selectedOrder.id, newOwner, newStatus);
      window.location.reload();
      
    } catch (err) {
      console.error(err);
      setError("Failed to update order status.");
    }
  };

  const fetchOrderHistory = async (orderId) => {
    try {
      const historyData = await getOrderHistory(orderId);
      setOrderHistory(historyData || []);
      setShowHistory(true);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch order history.");
    }
  };

  const openPopover = (order) => {
    setSelectedOrder(order);
  };

  const closePopover = () => {
    setSelectedOrder(null);
  };

  const closeHistory = () => {
    setShowHistory(false);
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>

      {error && <p className="text-red-500">{error}</p>}

      <Card className="p-4 mb-6">
        <form onSubmit={handleCreateOrder} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="manufacturer">Manufacturer</Label>
              <Select
                id="manufacturer"
                value={newOrder.manufacturer}
                onValueChange={handleManufacturerChange}
                required
                className="w-full"
                name="manufacturer"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select manufacturer" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {manufacturers.map((manufacturer) => (
                    <SelectItem key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="product">Product</Label>
              <Select
                id="product"
                name="product"
                value={newOrder.product}
                onValueChange={handleProductChange}
                required
                className="w-full"
                disabled={loadingProducts}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.sku + " " + product.description}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {loadingProducts && <p>Loading products...</p>}
            </div>
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                value={newOrder.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                required
                className="w-full"
              />
            </div>
          </div>
          <Button type="submit">Create Order</Button>
        </form>
      </Card>

      <Card className="overflow-x-auto w-full mb-6">
        <h2 className="text-xl font-semibold mb-4">Orders Received</h2>
        <Table className="min-w-full text-gray-700">
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersReceived.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="p-2">{order.id}</TableCell>
                <TableCell className="p-2">{order.product.sku + " : " + order.product.description}</TableCell>
                <TableCell className="p-2">{order.quantity}</TableCell>
                <TableCell className="p-2">{order.user.name}</TableCell>
                <TableCell className="p-2">{order.created_at}</TableCell>
                <TableCell className="p-2">{switchBadge(order.status)}</TableCell>
                <TableCell className="p-2">
                  {order.status === "Completed" ? (
                    "No Actions"
                  ) : (order.current_owner.email !== JSON.parse(localStorage.getItem("user")).email && order.status !== "Pending") ? (
                    "No Actions"
                  )
                  : order.status === "Pending" ? (
                    <>
                      <Button
                        variant="outline"
                        className="mr-2 border-green-500 text-green-500 hover:bg-green-100"
                        onClick={() => handleChangeOrderStatus(order.id, "Accepted")}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-100"
                        onClick={() => handleChangeOrderStatus(order.id, "Rejected")}
                      >
                        Reject
                      </Button>
                      <Button
                        variant="outline"
                        className="border-blue-500 text-blue-500 hover:bg-blue-100"
                        onClick={() => fetchOrderHistory(order.id)}
                      >
                        View History
                      </Button>
                    </>
                  ) : order.status === "Accepted" ? (
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-500 hover:bg-blue-100"
                      onClick={() => openPopover(order)}
                    >
                      Ship
                    </Button>
                  ) : order.status === "Shipped" ? (
                    <Button
                      variant="outline"
                      className="border-yellow-500 text-yellow-500 hover:bg-yellow-100"
                      onClick={() => openPopover(order)}
                    >
                      Deliver
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="border-green-500 text-green-500 hover:bg-green-100"
                      onClick={() => handleChangeOrderStatus(order.id, "Completed")}
                    >
                      Complete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <Card className="overflow-x-auto w-full">
        <h2 className="text-xl font-semibold mb-4">Orders Made</h2>
        <Table className="min-w-full text-gray-700">
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Origin</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersMade.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="p-2">{order.id}</TableCell>
                <TableCell className="p-2">{order.product.sku + " : " + order.product.description}</TableCell>
                <TableCell className="p-2">{order.quantity}</TableCell>
                <TableCell className="p-2">{order.origin}</TableCell>
                <TableCell className="p-2">{order.created_at}</TableCell>
                <TableCell className="p-2">{order.status}</TableCell>
                <TableCell className="p-2">
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-500 hover:bg-blue-100"
                    onClick={() => fetchOrderHistory(order.id)}
                  >
                    View History
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {showHistory && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Order History</h2>
            <Table className="min-w-full text-gray-700">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderHistory.map((history) => (
                  <TableRow key={history.id}>
                    <TableCell className="p-2">{history.created_at}</TableCell>
                    <TableCell className="p-2">{history.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <div className="flex justify-end mt-4">
              <Button onClick={closeHistory} variant="outline" className="border-gray-500 text-gray-500 hover:bg-gray-100">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/2">
            <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
            <Label htmlFor="status">Status</Label>
            <Select
              id="status"
              value={newStatus}
              onValueChange={(value) => setNewStatus(value)}
              required
              className="w-full mb-4"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="Shipped">Shipped</SelectItem>
                <SelectItem value="Delivered">Delivered</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Label htmlFor="newOwner">New Owner</Label>
            <Select
              id="newOwner"
              value={newOwner}
              onValueChange={(value) => setNewOwner(value)}
              required
              className="w-full mb-4"
            >
              <SelectTrigger>
                <SelectValue placeholder="Select new owner" />
              </SelectTrigger>
              <SelectContent position="popper">
                {suppliers.map((supplier) => (
                  <SelectItem key={supplier.id} value={supplier.id}>{supplier.name}</SelectItem>
                ))}
                {logisticsCompanies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>{company.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex justify-end space-x-4">
              <Button onClick={closePopover} variant="outline" className="border-gray-500 text-gray-500 hover:bg-gray-100">
                Cancel
              </Button>
              <Button onClick={handleChangeOrderStatusAndOwner} className="bg-blue-500 text-white hover:bg-blue-600">
                Update
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
