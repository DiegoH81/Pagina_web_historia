export type CityId = "florence" | "rome";

export interface CityInformation
{
    id: CityId;
    label: string;
    period: string;
    subtitle: string;
    model: string;
}

export const cities: Record<CityId, CityInformation> =
{
    florence:
    {
        id: "florence",
        label: "Florencia",
        period: "c. 1480",
        subtitle: "Arte, comercio y mecenazgo de los Médici",
        model: `${import.meta.env.BASE_URL}models/florence/florence_city.glb`
    },
    rome:
    {
        id: "rome",
        label: "Roma",
        period: "c. 1512",
        subtitle: "El papado y el esplendor del Alto Renacimiento",
        model: `${import.meta.env.BASE_URL}models/rome/rome_city.glb`
    }
};
