document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const memberData = {
        firstname: document.getElementById("firstname").value,
        middlename: document.getElementById("middlename").value,
        surname: document.getElementById("surname").value,
        birthdate: document.getElementById("birthdate").value,
        address: document.getElementById("address").value,
        barangay: document.getElementById("barangay").value,
        city: document.getElementById("municipality").value,
        province: document.getElementById("province").value,
        island: document.getElementById("island").value,
        region: document.getElementById("region").value,
        contact: document.getElementById("contact").value,
        email: document.getElementById("email").value,
        occupation: document.getElementById("occupation").value,
        priesthood: document.getElementById("priesthood").value,
        organization: parseInt(document.getElementById("organization").value, 10) || null, 
        memberStatus: 1 // Default status (e.g., Pending)
    };

    fetch("http://localhost:3002/member/add-member", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberData)
    })
    .then(response => response.json())
    .then(data => {
        alert("Member registered successfully!");
        console.log("New member ID:", data.memberID);
        window.location.href = "./index.html"; // Redirect to members list
    })
    .catch(error => {
        console.error("Error registering member:", error);
        alert("Failed to register member.");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    loadOrganizations(); // ✅ Call function when the page loads

    document.getElementById("island").addEventListener("change", function () {
        loadRegions(this.value); // Fetch regions based on selected island
    });

    document.getElementById("region").addEventListener("change", function () {
        loadProvinces(this.value);
    });

    document.getElementById("province").addEventListener("change", function () {
        loadMunicipalities(this.value);
    });

    document.getElementById("municipality").addEventListener("change", function () {
        loadBarangays(this.value);
    });
});

// ✅ Fetch Regions based on Island
function loadRegions(islandID) {
    const regionSelect = document.getElementById("region");
    regionSelect.innerHTML = '<option value="">Select Region</option>';
    regionSelect.disabled = !islandID;

    if (!islandID) return;

    fetch(`http://localhost:3002/address/regions/${islandID}`)
        .then(response => response.json())
        .then(regions => {
            regions.forEach(region => {
                let option = document.createElement("option");
                option.value = region.Region_ID;
                option.textContent = region.Region_Name;
                regionSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading regions:", error));
}

// ✅ Fetch Provinces based on Region
function loadProvinces(regionID) {
    const provinceSelect = document.getElementById("province");
    provinceSelect.innerHTML = '<option value="">Select Province</option>';
    provinceSelect.disabled = !regionID;

    if (!regionID) return;

    fetch(`http://localhost:3002/address/provinces/${regionID}`)
        .then(response => response.json())
        .then(provinces => {
            provinces.forEach(province => {
                let option = document.createElement("option");
                option.value = province.Province_ID;
                option.textContent = province.Province_Name;
                provinceSelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading provinces:", error));
}

// ✅ Fetch Municipalities based on Province
function loadMunicipalities(provinceID) {
    const municipalitySelect = document.getElementById("municipality");
    municipalitySelect.innerHTML = '<option value="">Select Municipality</option>';
    municipalitySelect.disabled = !provinceID;

    if (!provinceID) return;

    fetch(`http://localhost:3002/address/municipalities/${provinceID}`)
        .then(response => response.json())
        .then(municipalities => {
            municipalities.forEach(municipality => {
                let option = document.createElement("option");
                option.value = municipality.Municipality_ID;
                option.textContent = municipality.Municipality_Name;
                municipalitySelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading municipalities:", error));
}

// ✅ Fetch Barangays based on Municipality
function loadBarangays(municipalityID) {
    const barangaySelect = document.getElementById("barangay");
    barangaySelect.innerHTML = '<option value="">Select Barangay</option>';
    barangaySelect.disabled = !municipalityID;

    if (!municipalityID) return;

    fetch(`http://localhost:3002/address/barangays/${municipalityID}`)
        .then(response => response.json())
        .then(barangays => {
            barangays.forEach(barangay => {
                let option = document.createElement("option");
                option.value = barangay.Barangay_ID;
                option.textContent = barangay.Barangay_Name;
                barangaySelect.appendChild(option);
            });
        })
        .catch(error => console.error("Error loading barangays:", error));
}

function loadOrganizations() {
    fetch("http://localhost:3002/member/organizations")
        .then(response => {
            return response.json();
        })
        .then(organizations => {

            const orgSelect = document.getElementById("organization");
            orgSelect.innerHTML = '<option value="">Select Organization</option>'; // ✅ Clear old options

            organizations.forEach(org => {
                let option = document.createElement("option");
                option.value = org.org_ID;
                option.textContent = org.org_name;
                orgSelect.appendChild(option);
            });

        })
        .catch(error => console.error("Error loading organizations:", error));
}
