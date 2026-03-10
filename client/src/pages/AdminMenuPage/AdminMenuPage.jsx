import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useStoreMenu } from "../../hooks/useStoreMenu";
import MenuItemForm from "../../components/MenuItemForm/MenuItemForm";
import { useCreateMenuItem } from "../../hooks/useCreateMenuItem";
import { useDeleteMenuItem } from "../../hooks/useDeleteMenuItem";
import { useToggleMenuAvailability } from "../../hooks/useToggleMenuAvailability";
import { useUpdateMenuItem } from "../../hooks/useUpdateMenuItem";
import { formatCurrency } from "../../utils/currency";
import "./component.styles.scss";

const AdminMenuPage = () => {
  const user = useSelector((state) => state.auth.user);
  const storeId = user?.storeId;

  const { data = [] } = useStoreMenu(storeId);
  const createItem = useCreateMenuItem();
  const updateItem = useUpdateMenuItem();
  const deleteItem = useDeleteMenuItem();
  const toggleItem = useToggleMenuAvailability();
  const [editingId, setEditingId] = useState(null);

  const editingItem = useMemo(
    () => data.find((item) => (item._id || item.id) === editingId) || null,
    [data, editingId],
  );

  const isSaving = createItem.isPending || updateItem.isPending;

  const handleSubmit = (payload) => {
    if (!storeId) {
      return;
    }

    if (editingItem) {
      updateItem.mutate(
        {
          menuItemId: editingItem._id || editingItem.id,
          payload,
          storeId,
        },
        {
          onSuccess: () => {
            setEditingId(null);
          }
        },
      );
      return;
    }

    createItem.mutate(
      { ...payload, storeId },
      {
        onSuccess: () => {
          setEditingId(null);
        }
      },
    );
  };

  if (!storeId) {
    return (
      <section className="app-stack admin-menu-page">
        <h1>Menu Management</h1>
        <div className="card">
          <p>Missing admin store context.</p>
          <p>Please log out and log back in so your storeId is refreshed.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="app-stack admin-menu-page">
      <h1>Menu Management</h1>

      <MenuItemForm
        key={editingItem ? editingItem._id || editingItem.id : "create-item"}
        initialValues={editingItem}
        onSubmit={handleSubmit}
        isLoading={isSaving}
        submitLabel={editingItem ? "Update item" : "Create item"}
        onCancel={editingItem ? () => setEditingId(null) : undefined}
      />

      <div className="admin-menu-list">
        {data.map((item) => {
          const menuItemId = item._id || item.id;
          const isAvailable = item.available === true;

          return (
            <article key={menuItemId} className="admin-menu-card card">
              <div className="admin-menu-card-header">
                <h3>{item.name}</h3>
                <span
                  className={`admin-menu-availability ${
                    isAvailable ? "is-available" : "is-unavailable"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </span>
              </div>

              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="admin-menu-image"
                />
              ) : null}

              <p>{item.description}</p>
              <p>
                <strong>Price:</strong> {formatCurrency(item.price)}
              </p>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Tags:</strong>{" "}
                {item.tags?.length ? item.tags.join(", ") : "None"}
              </p>

              <div className="admin-menu-actions">
                <button type="button" onClick={() => setEditingId(menuItemId)}>
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => deleteItem.mutate({ menuItemId, storeId })}
                >
                  Delete
                </button>
                <button
                  type="button"
                  onClick={() => toggleItem.mutate({ menuItemId, storeId })}
                >
                  {isAvailable ? "Set unavailable" : "Set available"}
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default AdminMenuPage;
