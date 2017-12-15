package module.map.entity;

/**
 * 封装地图初始化时房源数据
 * @author User
 */
public class RenderDTO {
    /**房源编号*/
    private String fybh;
    /**市、区、街道名称*/
    private String city;
    private String district;
    private String street;
    private String community;
    private Number cityDm;
    private Number districtDm;
    private Number streetDm;
    /**房源数*/
    private Number count;
    /**房源坐落*/
    private String fwzl;
    /**经度*/
    private String lat;
    /**纬度*/
    private String lng;
    
    public Number getDistrictDm() {
        return districtDm;
    }
    public void setDistrictDm(Number districtDm) {
        this.districtDm = districtDm;
    }
    public Number getCityDm() {
        return cityDm;
    }
    public void setCityDm(Number cityDm) {
        this.cityDm = cityDm;
    }
    public Number getStreetDm() {
        return streetDm;
    }
    public void setStreetDm(Number streetDm) {
        this.streetDm = streetDm;
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
    public String getStreet() {
        return street;
    }
    public void setStreet(String street) {
        this.street = street;
    }
    public String getCommunity() {
        return community;
    }
    public void setCommunity(String community) {
        this.community = community;
    }
    public String getFybh() {
        return fybh;
    }
    public void setFybh(String fybh) {
        this.fybh = fybh;
    }
    public String getFwzl() {
        return fwzl;
    }
    public void setFwzl(String fwzl) {
        this.fwzl = fwzl;
    }
    public String getLat() {
        return lat;
    }
    public void setLat(String lat) {
        this.lat = lat;
    }
    public String getLng() {
        return lng;
    }
    public void setLng(String lng) {
        this.lng = lng;
    }
    public Number getCount() {
        return count;
    }
    public void setCount(Number count) {
        this.count = count;
    }
    
}
