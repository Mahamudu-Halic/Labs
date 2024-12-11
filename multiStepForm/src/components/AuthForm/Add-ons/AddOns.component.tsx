import Header from "../Header/Header.component.tsx";
import {AddOnsListType, AddonsType, AddonType} from "../../../types.ts";
import "./addons.styles.css";
import {AddonsList} from "../../../constant.ts";
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";
import {updateForm} from "../../../features/Form/FormSlice.tsx";

const AddOns = ({addons, timeFrame}: AddonsType) => {
    const dispatch = useAppDispatch()
    const handleAddonToggle = (item: AddonType) => {
        const currentAddons = addons ?? [];
        const updatedAddons = currentAddons.some(
            (addon) => addon.title === item.title
        )
            ? currentAddons.filter((addon) => addon.title !== item.title)
            : [...currentAddons, {title: item.title, price: item.price}];

        dispatch(updateForm({fieldToUpdate: {addons: updatedAddons}}))
    };

    const addon = AddonsList.map((item: AddOnsListType) => (
        <div key={item.key} className="add-on__item">
            <input
                type="checkbox"
                id={item.title}
                onChange={() => handleAddonToggle(item)}
                checked={(addons ?? []).some(
                    (addon: AddonType) => addon.title === item.title
                )}
            />
            <label htmlFor={item.title}>
                <span className={"add-on__item-custom-check"}></span>
                <div className="add-on__item-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
                <p className="add-on__item-price">
                    +$
                    {timeFrame === "yearly"
                        ? item.price * 10 + `/yr`
                        : item.price + `/mo`}
                </p>
            </label>
        </div>
    ));

    return (
        <div className={"add-ons wrapper"}>
            <Header
                title={"Pick add-ons"}
                description={"Add-ons help enhance your gaming experience"}
            />

            <div className="add-ons__container">{addon}</div>

        </div>
    );
};

export default AddOns;
