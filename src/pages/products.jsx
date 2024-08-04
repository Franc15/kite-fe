import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addProduct, getProducts } from "@/services/apiService";

const initialProducts = [];

const ProductsPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    image: null
  });
  const [imagePreview, setImagePreview] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setNewProduct({ ...newProduct, image: file });
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('sku', newProduct.sku);
    formData.append('description', newProduct.description);
    formData.append('quantity', newProduct.quantity);
    if (newProduct.image) {
      formData.append('image', newProduct.image);
    }

    const response = await addProduct(formData);
    if (response.success) {
      setProducts([...products, { ...newProduct, id: products.length + 1, image: imagePreview }]);
      setNewProduct({ name: "", description: "", image: null });
      setImagePreview("");
    } else {
      // Handle error
      console.error(response.message);
    }
  };

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data.products);
    });
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      <Card className="p-4 mb-6">
        <form onSubmit={handleAddProduct} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="sku">SKU</Label>
              <Input
                type="text"
                id="sku"
                name="sku"
                value={newProduct.sku}
                onChange={handleInputChange}
                placeholder="Enter product SKU"
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
                required
              />
            </div>
            <div>
              <Label htmlFor="quantity">Quantity in Stock</Label>
              <Input
                type="number"
                id="quantity"
                name="quantity"
                value={newProduct.quantity}
                onChange={handleInputChange}
                placeholder="Enter quantity"
                required
              />
              </div>
            <div>
              <Label htmlFor="image">Image</Label>
              <Input
                type="file"
                id="image"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                required
              />
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded mt-2" />
              )}
            </div>
          </div>
          <Button 
          type="submit" 
          className="bg-green-900"
          >Add Product</Button>
        </form>
      </Card>

      <Card className="overflow-x-auto w-full">
        <Table className="min-w-full text-gray-900">
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="p-2">
                  <img src={product.image} alt={product.sku} className="w-16 h-16 object-cover rounded" />
                </TableCell>
                <TableCell className="p-2">{product.sku}</TableCell>
                <TableCell className="p-2">{product.description}</TableCell>
                <TableCell className="p-2">{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ProductsPage;
