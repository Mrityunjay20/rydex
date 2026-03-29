"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Plus, Pencil, Trash2, Tag } from "lucide-react";

interface Coupon {
  id: string;
  code: string;
  discountPercent: number;
  isActive: boolean;
  expiryDate: string | null;
  maxUses: number | null;
  usedCount: number;
  description: string | null;
  createdAt: string;
}

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Coupon | null>(null);
  const [formData, setFormData] = useState({
    code: "",
    discountPercent: "",
    isActive: true,
    expiryDate: "",
    maxUses: "",
    description: "",
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await fetch("/api/coupons");
      if (response.ok) {
        const data = await response.json();
        setCoupons(data);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingCoupon
        ? `/api/coupons/${editingCoupon.id}`
        : "/api/coupons";
      const method = editingCoupon ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.code.toUpperCase(),
          discountPercent: parseInt(formData.discountPercent),
          isActive: formData.isActive,
          expiryDate: formData.expiryDate || null,
          maxUses: formData.maxUses ? parseInt(formData.maxUses) : null,
          description: formData.description || null,
        }),
      });

      if (response.ok) {
        await fetchCoupons();
        setShowDialog(false);
        resetForm();
        alert(editingCoupon ? "Coupon updated!" : "Coupon created!");
      } else {
        const error = await response.json();
        alert(error.error || "Failed to save coupon");
      }
    } catch (error) {
      console.error("Error saving coupon:", error);
      alert("Failed to save coupon");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    try {
      const response = await fetch(`/api/coupons/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCoupons();
        alert("Coupon deleted!");
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      alert("Failed to delete coupon");
    }
  };

  const toggleActive = async (coupon: Coupon) => {
    try {
      const response = await fetch(`/api/coupons/${coupon.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });

      if (response.ok) {
        await fetchCoupons();
      }
    } catch (error) {
      console.error("Error toggling coupon:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      code: "",
      discountPercent: "",
      isActive: true,
      expiryDate: "",
      maxUses: "",
      description: "",
    });
    setEditingCoupon(null);
  };

  const openEditDialog = (coupon: Coupon) => {
    setEditingCoupon(coupon);
    setFormData({
      code: coupon.code,
      discountPercent: coupon.discountPercent.toString(),
      isActive: coupon.isActive,
      expiryDate: coupon.expiryDate ? coupon.expiryDate.split('T')[0] : "",
      maxUses: coupon.maxUses?.toString() || "",
      description: coupon.description || "",
    });
    setShowDialog(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Coupon Management</h1>
          <p className="text-muted-foreground">Create and manage discount coupons</p>
        </div>
        <Button
          onClick={() => {
            resetForm();
            setShowDialog(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">{coupons.length}</div>
            <p className="text-sm text-muted-foreground">Total Coupons</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {coupons.filter((c) => c.isActive).length}
            </div>
            <p className="text-sm text-muted-foreground">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {coupons.reduce((sum, c) => sum + c.usedCount, 0)}
            </div>
            <p className="text-sm text-muted-foreground">Total Uses</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-bold">
              {coupons.filter((c) => {
                if (!c.expiryDate) return false;
                return new Date(c.expiryDate) < new Date();
              }).length}
            </div>
            <p className="text-sm text-muted-foreground">Expired</p>
          </CardContent>
        </Card>
      </div>

      {/* Coupons List */}
      <Card>
        <CardHeader>
          <CardTitle>All Coupons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {coupons.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No coupons created yet. Click "Create Coupon" to get started.
              </p>
            ) : (
              coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <Tag className="h-8 w-8 text-blue-600" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{coupon.code}</h3>
                        <Badge variant={coupon.isActive ? "default" : "secondary"}>
                          {coupon.isActive ? "Active" : "Inactive"}
                        </Badge>
                        {coupon.expiryDate && new Date(coupon.expiryDate) < new Date() && (
                          <Badge variant="destructive">Expired</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {coupon.discountPercent}% discount
                        {coupon.description && ` • ${coupon.description}`}
                      </p>
                      <div className="flex gap-4 text-xs text-muted-foreground mt-1">
                        <span>Used: {coupon.usedCount}{coupon.maxUses ? `/${coupon.maxUses}` : ""}</span>
                        {coupon.expiryDate && (
                          <span>
                            Expires: {new Date(coupon.expiryDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={coupon.isActive}
                      onCheckedChange={() => toggleActive(coupon)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(coupon)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(coupon.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      {showDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>
                {editingCoupon ? "Edit Coupon" : "Create New Coupon"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="code">Coupon Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) =>
                      setFormData({ ...formData, code: e.target.value.toUpperCase() })
                    }
                    placeholder="e.g., SAVE10"
                    required
                    disabled={!!editingCoupon}
                  />
                </div>

                <div>
                  <Label htmlFor="discountPercent">Discount Percentage (%) *</Label>
                  <Input
                    id="discountPercent"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.discountPercent}
                    onChange={(e) =>
                      setFormData({ ...formData, discountPercent: e.target.value })
                    }
                    placeholder="e.g., 10"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="e.g., New user discount"
                  />
                </div>

                <div>
                  <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) =>
                      setFormData({ ...formData, expiryDate: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="maxUses">Max Uses (Optional)</Label>
                  <Input
                    id="maxUses"
                    type="number"
                    min="1"
                    value={formData.maxUses}
                    onChange={(e) =>
                      setFormData({ ...formData, maxUses: e.target.value })
                    }
                    placeholder="Leave empty for unlimited"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isActive: checked })
                    }
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingCoupon ? "Update" : "Create"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setShowDialog(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
