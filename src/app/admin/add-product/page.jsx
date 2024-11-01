"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { addProduct } from "@/app/actions/admin";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/app/actions/categories";
import { useToast } from "@/hooks/use-toast";

function AddProductForm() {
  const { toast } = useToast();
  const [categories, setCategories] = useState([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();

  async function submitProduct(formData) {
    const data = await addProduct(formData);

    if (data) {
      toast({
        title: "Success!",
        description: "Product added successfully",
        className: "bg-green-300 text-green-900",
      });
      reset();
    } else {
      toast({
        title: "Error!",
        description: "Something went wrong",
        className: "bg-red-300 text-red-900",
      });
    }
  }

  async function callApi() {
    const categories = await getCategories();
    setCategories(categories);
  }

  useEffect(function () {
    callApi();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(submitProduct)}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                {...register("name", { required: "this field is required" })}
              />
              {errors.name && (
                <p className="text-destructive text-sm">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                {...register("description", {
                  required: "this field is required",
                })}
              />{" "}
              {errors.description && (
                <p className="text-destructive text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                {...register("price", {
                  required: "this field is required",
                })}
              />
              {errors.price && (
                <p className="text-destructive text-sm">
                  {errors.price.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Controller
                name="category"
                control={control}
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id.toString()}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="image">Product Image</Label>
              <Input
                id="image"
                name="image"
                type="file"
                {...register("image", {
                  required: "this field is required",
                })}
              />
              {errors.image && (
                <p className="text-destructive text-sm">
                  {errors.image.message}
                </p>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" onClick={handleSubmit(submitProduct)}>
          Add Product
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AddProductForm;
