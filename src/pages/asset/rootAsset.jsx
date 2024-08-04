import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const assets = [
  { id: 1, name: "Ford Ranger - GLT 76XX Load", location: "Location 1", status: "Active", imageUrl: "https://di-uploads-pod42.dealerinspire.com/rugeschevrolet/uploads/2023/01/Used-truck-dealer-2020-Chevy-Silverado-1500-Red-1.jpg" },
  { id: 2, name: "Scania Mx6455", location: "Location 2", status: "Inactive", imageUrl: "https://gomotive.com/wp-content/uploads/2022/04/MeetCustomer_FullWidth_2x-18.jpeg" },
  { id: 3, name: "Heavelift Machinery 3332", location: "Location 3", status: "Maintenance", imageUrl: "https://www.schaeffler.de/remotemedien/media/_shared_media_rwd/04_sectors_1/industry_1/construction_machinery/00085545_16_9-schaeffler-industry-solutions-construction-machinery-crawler-excavator_rwd_600.jpg" },
  { id: 4, name: "Warehouse Toronto A2", location: "Location 4", status: "Active", imageUrl: "https://cms.ar-racking.com/uploads/2020/06/2023-3.jpg" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "bg-green-500 text-white";
    case "Inactive":
      return "bg-red-500 text-white";
    case "Maintenance":
      return "bg-yellow-500 text-black";
    default:
      return "bg-blue-500 text-white";
  }
};

export default function RootAsset() {
  const handleOpenForm = () => {
    console.log("Open form");
  }
  
  return (
    <div className="flex flex-col h-full p-6 space-y-6 border rounded shadow-lg">
      {/* Header Section: Assets Heading, Search Bar, and Create Asset Button */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Assets</h1>
        <div className="flex space-x-4">
          <Input 
            type="text" 
            placeholder="Search" 
            className="w-64"
          />
          <Button
            variant="primary"
            onClick={handleOpenForm}
          >Create Asset</Button>
        </div>
      </div>

      {/* Content Section: Left Side (Asset List) and Right Side (Asset Details) */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Side: Asset List */}
        <div className="w-1/3 h-full overflow-y-auto">
          {assets.map((asset) => (
            <Link key={asset.id} to={`/asset/${asset.id}`}>
              <div className="flex items-center p-4 hover:bg-gray-100 transition-all rounded cursor-pointer mb-2">
                <img src={asset.imageUrl} alt={asset.name} className="w-12 h-12 object-cover rounded mr-4" />
                <div className="flex flex-col flex-grow">
                  <span className="text-lg font-semibold">{asset.name}</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm mr-2">{asset.location}</span>
                    <Badge className={`py-1 px-2 rounded text-xs ${getStatusColor(asset.status)}`}>{asset.status}</Badge>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Right Side: Asset Details */}
        <div className="w-2/3 h-full border rounded p-4">
          <p className="text-gray-500">Select an asset from the list to view details</p>
        </div>
      </div>
    </div>
  );
}
