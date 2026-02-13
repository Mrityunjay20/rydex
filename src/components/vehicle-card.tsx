import Link from "next/link";
import Image from "next/image";
import { Fuel, Users, Gauge, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Vehicle } from "@/lib/types";

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="group overflow-hidden border transition-all hover:shadow-lg">
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={vehicle.images[0]}
          alt={vehicle.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <Badge className="absolute left-3 top-3" variant="secondary">
          {vehicle.type}
        </Badge>
        {!vehicle.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <Badge variant="destructive" className="text-sm">
              Unavailable
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="font-semibold leading-tight">{vehicle.name}</h3>
            <p className="text-xs text-muted-foreground">
              {vehicle.brand} {vehicle.model} &middot; {vehicle.year}
            </p>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5" />
            {vehicle.fuelType}
          </span>
          <span className="flex items-center gap-1">
            <Gauge className="h-3.5 w-3.5" />
            {vehicle.transmission}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {vehicle.seats} Seats
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
          <MapPin className="h-3.5 w-3.5" />
          {vehicle.location}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <p className="text-lg font-bold">
              ₹{vehicle.pricePerDay.toLocaleString("en-IN")}
              <span className="text-xs font-normal text-muted-foreground">
                /day
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              ₹{vehicle.pricePerHour}/hr
            </p>
          </div>
          <Button size="sm" asChild>
            <Link href={`/vehicles/${vehicle.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
