import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createAsset, getAssets, getPredictions, getMeterReadings } from "@/services/apiService";
import { Badge } from "@/components/ui/badge";

const AssetsPage = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({ name: "", description: "", type: "", location: "", status: "", serial: "" });
  const [error, setError] = useState(null);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [meterReadings, setMeterReadings] = useState({
    Type_L: 0,
    Type_M: 0,
    'Air temperature [K]': '',
    'Process temperature [K]': '',
    'Rotational speed [rpm]': '',
    'Torque [Nm]': '',
    'Tool wear [min]': ''
  });
  const [predictions, setPredictions] = useState(null);
  const [meterReadingsHistory, setMeterReadingsHistory] = useState([]);
  const [viewHistory, setViewHistory] = useState(false);

  const fetchAssets = async () => {
    try {
      const assetsData = await getAssets();
      setAssets(assetsData || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch assets.");
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAsset({ ...newAsset, [name]: value });
  };

  const handleCreateAsset = async (e) => {
    e.preventDefault();
    try {
      const response = await createAsset(newAsset);
      if (response.success) {
        setNewAsset({ name: "", description: "", type: "", location: "", status: "", serial: "" });
        fetchAssets(); // Re-fetch all data to update the UI
      } else {
        setError("Failed to create asset.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create asset.");
    }
  };

  const handleMeterReadingChange = (e) => {
    const { name, value } = e.target;
    setMeterReadings({ ...meterReadings, [name]: value });
  };

  const handleOpenForm = (asset) => {
    setSelectedAsset(asset);
    setViewHistory(false);
  };

  const handleCloseForm = () => {
    setSelectedAsset(null);
    setViewHistory(false);
    setMeterReadings({
      Type_L: 0,
      Type_M: 0,
      'Air temperature [K]': '',
      'Process temperature [K]': '',
      'Rotational speed [rpm]': '',
      'Torque [Nm]': '',
      'Tool wear [min]': ''
    });
  };

  const handleSubmitMeterReadings = async () => {
    console.log("Meter readings submitted: ", meterReadings);

    // Convert meter readings to integers
    const convertedReadings = {
      Type_L: parseInt(meterReadings.Type_L),
      Type_M: parseInt(meterReadings.Type_M),
      'Air temperature [K]': parseInt(meterReadings['Air temperature [K]']),
      'Process temperature [K]': parseInt(meterReadings['Process temperature [K]']),
      'Rotational speed [rpm]': parseInt(meterReadings['Rotational speed [rpm]']),
      'Torque [Nm]': parseInt(meterReadings['Torque [Nm]']),
      'Tool wear [min]': parseInt(meterReadings['Tool wear [min]'])
    };

    try {
      const response = await getPredictions(selectedAsset.id, convertedReadings);
      console.log(response);
    } catch (err) {
      console.error(err);
    }

    handleCloseForm();
  };

  const getMeterReadingsForAsset = async (assetId) => {
    try {
      const readings = await getMeterReadings(assetId);
    //   setMeterReadingsHistory(readings.sort((a, b) => new Date(b.date) - new Date(a.date)));
    setMeterReadingsHistory(readings);
      console.log("Meter readings for asset ", assetId, ": ", readings);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewHistory = (asset) => {
    setSelectedAsset(asset);
    getMeterReadingsForAsset(asset.id);
    setViewHistory(true);
  };

  const getStatusBadge = (status) => {
    return status === 0 ? (
      <Badge color="green">Okay</Badge>
    ) : (
      <Badge color="red">Failure</Badge>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">Assets</h1>

      {error && <p className="text-red-500">{error}</p>}

      <Card className="p-4 mb-6">
        <form onSubmit={handleCreateAsset} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={newAsset.name}
                onChange={handleInputChange}
                placeholder="Enter asset name"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="serial">Serial Number</Label>
              <Input
                type="text"
                id="serial"
                name="serial"
                value={newAsset.serial}
                onChange={handleInputChange}
                placeholder="Enter asset serial number"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                type="text"
                id="description"
                name="description"
                value={newAsset.description}
                onChange={handleInputChange}
                placeholder="Enter asset description"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                type="text"
                id="location"
                name="location"
                value={newAsset.location}
                onChange={handleInputChange}
                placeholder="Enter asset location"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="type">Type</Label>
              <Input
                type="text"
                id="type"
                name="type"
                value={newAsset.type}
                onChange={handleInputChange}
                placeholder="Enter asset type"
                required
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select name="status" id="status" value={newAsset.status} onChange={handleInputChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup label="Status">
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button type="submit">Create Asset</Button>
        </form>
      </Card>

      <Card className="overflow-x-auto w-full">
        <h2 className="text-xl font-semibold mb-4">Existing Assets</h2>
        <Table className="min-w-full text-gray-700">
          <TableHeader>
            <TableRow>
              <TableHead>Asset ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Serial Number</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset) => (
              <TableRow key={asset.id}>
                <TableCell className="p-2">{asset.id}</TableCell>
                <TableCell className="p-2">{asset.name}</TableCell>
                <TableCell className="p-2">{asset.serial_number}</TableCell>
                <TableCell className="p-2">{asset.location}</TableCell>
                <TableCell className="p-2">{asset.description}</TableCell>
                <TableCell className="p-2">{asset.type}</TableCell>
                <TableCell className="p-2">{asset.status}</TableCell>
                <TableCell className="p-2">
                  <Button onClick={() => handleOpenForm(asset)}>Enter Meter Readings</Button>
                  <Button className="ml-2" onClick={() => handleViewHistory(asset)}>View History</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {selectedAsset && !viewHistory && (
        <Card className="p-4 mb-6">
          <h3 className="font-bold mb-2">Enter Meter Readings for {selectedAsset.name}</h3>
          <form className="space-y-4">
            {Object.keys(meterReadings).map((key) => (
              <div key={key}>
                <Label htmlFor={key}>{key}</Label>
                <Input
                  type="text"
                  id={key}
                  name={key}
                  value={meterReadings[key]}
                  onChange={handleMeterReadingChange}
                  placeholder={`Enter ${key}`}
                  required
                  className="w-full"
                />
              </div>
            ))}
          </form>
          <div className="mt-4 flex justify-end">
            <Button onClick={handleSubmitMeterReadings}>Submit</Button>
            <Button className="ml-2" onClick={handleCloseForm}>Cancel</Button>
          </div>
        </Card>
      )}

      {selectedAsset && viewHistory && (
        <Card className="overflow-x-auto w-full">
          <h2 className="text-xl font-semibold mb-4">Meter Readings History for {selectedAsset.name}</h2>
          {meterReadingsHistory.length > 0 ? (
            <Table className="min-w-full text-gray-700">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type_L</TableHead>
                  <TableHead>Type_M</TableHead>
                  <TableHead>Air Temperature [K]</TableHead>
                  <TableHead>Process Temperature [K]</TableHead>
                  <TableHead>Rotational Speed [rpm]</TableHead>
                  <TableHead>Torque [Nm]</TableHead>
                  <TableHead>Tool Wear [min]</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {meterReadingsHistory.map((reading) => (
                  <TableRow key={reading.date}>
                    <TableCell className="p-2">{new Date(reading.created_at).toLocaleString()}</TableCell>
                    <TableCell className="p-2">{reading.type_l}</TableCell>
                    <TableCell className="p-2">{reading.type_m}</TableCell>
                    <TableCell className="p-2">{reading.air_temperature}</TableCell>
                    <TableCell className="p-2">{reading.process_temperature}</TableCell>
                    <TableCell className="p-2">{reading.rorational_speed}</TableCell>
                    <TableCell className="p-2">{reading.torque}</TableCell>
                    <TableCell className="p-2">{reading.tool_wear}</TableCell>
                    <TableCell className="p-2">{getStatusBadge(reading.prediction)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-center">No meter readings history available.</p>
          )}
        </Card>
      )}
    </div>
  );
};

export default AssetsPage;
