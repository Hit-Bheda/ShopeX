import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import HomeProductDropdown from "./HomeProductDropdown";

const HomePageEditor = () => {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Manage The Home Page!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <label>Product 1</label>
              <HomeProductDropdown />
            </div>
            <div className="space-y-2">
              <label>Product 1</label>
              <HomeProductDropdown />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePageEditor;
