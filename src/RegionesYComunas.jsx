import { useState, useEffect } from 'react';

const RegionComunaForm = () => {
  const [regions, setRegions] = useState([]); // Array to store available regions
  const [selectedRegion, setSelectedRegion] = useState(''); // Selected region
  const [comunas, setComunas] = useState([]); // Array to store available comunas

  // Fetch regions data from an API or source (replace with your implementation)
  useEffect(() => {
    const fetchRegions = async () => {
      const response = await fetch('https://your-api-endpoint/regions'); // Replace with your actual API endpoint
      const data = await response.json();
      setRegions(data);
    };

    fetchRegions();
  }, []);

  // Function to fetch comunas based on selected region
  const fetchComunas = async (regionId) => {
    const response = await fetch(`https://your-api-endpoint/comunas/${regionId}`); // Replace with your actual API endpoint
    const data = await response.json();
    setComunas(data);
    setSelectedRegion(regionId); // Update selected region for clarity
  };

  return (
    <form>
      <label htmlFor="region">Select Region:</label>
      <select id="region" value={selectedRegion} onChange={(e) => fetchComunas(e.target.value)}>
        <option value="">-- Select Region --</option>
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>

      {selectedRegion && ( // Render comuna selection only if a region is selected
        <div>
          <label htmlFor="comuna">Select Comuna:</label>
          <select id="comuna" value={comunas.find((comuna) => comuna.selected) ? comunas.find((comuna) => comuna.selected).id : ''}>
            <option value="">-- Select Comuna --</option>
            {comunas.map((comuna) => (
              <option key={comuna.id} value={comuna.id}>
                {comuna.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit">Submit</button>
    </form>
  );
};

export default RegionComunaForm;