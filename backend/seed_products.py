import os
import json
import django

# Configure Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()


from apps.products.models import Product, Category
from django.conf import settings

def load_products_from_json():
    
    #Load products from the JSON file.    
    # json_path = os.path.join(os.path.dirname(__file__), 'data', 'products.json')

    json_path = os.path.join(settings.BASE_DIR, 'data', 'products.json')
    
    print(f"DEBUG: Looking for JSON at: {json_path}")
    
    try:
        with open(json_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: Could not find {json_path}")
        print("Make sure data/products.json exists in the backend folder.")
        return []
    except json.JSONDecodeError:
        print(f"Error: {json_path} is not valid JSON")
        return []


def seed_database():
    """Populate database with coffee products from JSON file."""
    
    # Load products from JSON
    products_data = load_products_from_json()
    
    if not products_data:
        print("No products to seed. Aborting.")
        return
    
    # Create or get the main category
    coffee_category, created = Category.objects.get_or_create(
        name="Coffee Beans"
    )
    
    if created:
        print("✅ Created 'Coffee Beans' category")
    else:
        print("📌 'Coffee Beans' category already exists")
    
    created_count = 0
    skipped_count = 0
    error_count = 0
    
    for product_data in products_data:
        try:
            # Get or create product using SKU as unique identifier
            product, created = Product.objects.update_or_create(
                sku=product_data["sku"],
                defaults={
                    "category": coffee_category,
                    "name": product_data["name"],
                    "flavors": product_data.get("flavors", ""),
                    "description": product_data["description"],
                    "price": product_data["price"],
                    "stock_quantity": product_data["stock_quantity"],
                    "image_url": product_data.get("image_url", ""),
                    "roast_level": product_data.get("roast_level", ""),
                    "origin": product_data["origin"],
                    "weight_grams": product_data.get("weight_grams", 0),
                    "is_active": product_data.get("is_active", True),
                }
            )
            
            if created:
                print(f"Created new product: {product.name}")
                created_count += 1
            else:
                print(f"Updated existing product: {product.name}")
                updated_count += 1
                
        except KeyError as e:
            print(f"Error: Missing required field {e} in product data")
            error_count += 1
        except Exception as e:
            print(f"Error creating product: {e}")
            error_count += 1
    
    # Summary
    print(f"\n{'='*50}")
    print(f"Seeding complete!")
    print(f"  Created: {created_count} products")
    print(f"  Skipped: {skipped_count} products (already in database)")
    if error_count > 0:
        print(f"  Errors: {error_count} products")
    print(f"{'='*50}\n")


# if __name__ == "__main__":
print("Starting database seed from JSON...\n")
seed_database()

'''
Error: Could not find /home/hatonjan/.local/share/virtualenvs/backend-yYBY7KD2/lib/python3.12/site-packages/django/core/management/commands/data/products.json
Make sure data/products.json exists in the backend folder.
No products to seed. Aborting.
'''