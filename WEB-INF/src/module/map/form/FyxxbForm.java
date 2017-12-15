package module.map.form;


import commom.entity.SuperForm;
import module.map.entity.Fyxxb;

/**
 * @author User
 */
public class FyxxbForm extends SuperForm {

	private static final long serialVersionUID = -7424319305563483592L;

	Fyxxb f = new Fyxxb();
	Integer fwjzmj;
	String minLat;
	String minLng;
	String maxLat;
	String maxLng;
	String city;
	String district;
	String sortMj;
	String sortPrice;
	
	
    public String getSortMj() {
        return sortMj;
    }

    public void setSortMj(String sortMj) {
        this.sortMj = sortMj;
    }

    public String getSortPrice() {
        return sortPrice;
    }

    public void setSortPrice(String sortPrice) {
        this.sortPrice = sortPrice;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getDistrict() {
        return district;
    }

    public void setDistrict(String district) {
        this.district = district;
    }

    public String getMinLat() {
        return minLat;
    }

    public void setMinLat(String minLat) {
        this.minLat = minLat;
    }

    public String getMinLng() {
        return minLng;
    }

    public void setMinLng(String minLng) {
        this.minLng = minLng;
    }

    public String getMaxLat() {
        return maxLat;
    }

    public void setMaxLat(String maxLat) {
        this.maxLat = maxLat;
    }

    public String getMaxLng() {
        return maxLng;
    }

    public void setMaxLng(String maxLng) {
        this.maxLng = maxLng;
    }


    public Integer getFwjzmj() {
        return fwjzmj;
    }

    public void setFwjzmj(Integer fwjzmj) {
        this.fwjzmj = fwjzmj;
    }

    public Fyxxb getF() {
        return f;
    }

    public void setF(Fyxxb f) {
        this.f = f;
    }
}
