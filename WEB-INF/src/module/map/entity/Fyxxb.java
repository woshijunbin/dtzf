package module.map.entity;

import java.math.BigDecimal;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
/**
 * @author User
 */
@SuppressWarnings("serial")
@Entity
@Table(name = "fyxxb", catalog = "undetermined")
public class Fyxxb implements java.io.Serializable {
  
    @Id
    @Column(name = "FYBH", unique = true, nullable = false, length = 50)
    private String fybh;

    /**
     * 所在省份代码
     */
    @Column(name = "SZSS")
    private Integer szss;

    /**
     * 所在城市代码
     */
    @Column(name = "CS")
    private Integer cs;

    @Column(name = "QX")
    private Integer qx;

    @Column(name = "QY")
    private Integer qy;

    /**
     * 房屋位置
     */
    @Column(name = "FWZL", length = 500)
    private String fwzl;

    /**
     * 建筑面积
     */
    @Column(name = "FWJZMJ", precision = 11)
    private BigDecimal fwjzmj;

    @Column(name = "FX", length = 100)
    private String fx;

    /**
     * 所在楼层
     */
    @Column(name = "SZLC")
    private Integer szlc;

    @Column(name = "SZZLC")
    private Integer szzlc;
    
    @Column(name = "FYCX", length = 100)
    private String fycx;
    
    @Column(name = "FWJG", length = 100)
    private String fwjg;
    
    @Column(name = "FWYT", length = 100)
    private String fwyt;
    
    @Column(name = "ZXCD", length = 100)
    private String zxcd;
    
    @Column(name = "FWZS_SBCL", length = 65535)
    private String fwzsSbcl;
    
    @Column(name = "FWWG", length = 100)
    private String fwwg;
    
    @Column(name = "JGNF")
    private Integer jgnf;
    
    @Column(name = "QSLB", length = 100)
    private String qslb;
    
    @Column(name = "SYXZ", length = 100)
    private String syxz;
    
    @Column(name = "GLFS", length = 50)
    private String glfs;
    
    @Column(name = "PTSS", length = 65535)
    private String ptss;
    
    @Column(name = "JTXL", length = 65535)
    private String jtxl;
    
    @Column(name = "TBSM", length = 65535)
    private String tbsm;
    
    @Column(name = "LPSQQK", length = 65535)
    private String lpsqqk;
    
    @Column(name = "WGQK", length = 65535)
    private String wgqk;
    
    @Column(name = "ZP", length = 800)
    private String zp;
    
    @Column(name = "ZPSL")
    private Integer zpsl;
    
    @Column(name = "LR_OPERATOR", length = 50)
    private String lrOperator;
    
    @Temporal(TemporalType.DATE)
    @Column(name = "OPERATOR_DATE", length = 10)
    private Date operatorDate;
    
    /**
     * 纬度
     */
    @Column(name = "LNG", length = 50)
    private String lng;
    
    /**
     * 经度
     */
    @Column(name = "LAT", length = 50)
    private String lat;
    
    
    
    public Fyxxb() {
    }
    
    public Fyxxb(String fybh) {
        this.fybh = fybh;
    }
    
    public Fyxxb(String fybh, Integer szss, Integer cs, Integer qx, Integer qy, String fwzl, BigDecimal fwjzmj,
            String fx, Integer szlc, Integer szzlc, String fycx, String fwjg, String fwyt, String zxcd, String fwzsSbcl,
            String fwwg, Integer jgnf, String qslb, String syxz, String glfs, String ptss, String jtxl, String tbsm,
            String lpsqqk, String wgqk, String zp, Integer zpsl, String lrOperator, Date operatorDate, String lng,
            String lat) {
        this.fybh = fybh;
        this.szss = szss;
        this.cs = cs;
        this.qx = qx;
        this.qy = qy;
        this.fwzl = fwzl;
        this.fwjzmj = fwjzmj;
        this.fx = fx;
        this.szlc = szlc;
        this.szzlc = szzlc;
        this.fycx = fycx;
        this.fwjg = fwjg;
        this.fwyt = fwyt;
        this.zxcd = zxcd;
        this.fwzsSbcl = fwzsSbcl;
        this.fwwg = fwwg;
        this.jgnf = jgnf;
        this.qslb = qslb;
        this.syxz = syxz;
        this.glfs = glfs;
        this.ptss = ptss;
        this.jtxl = jtxl;
        this.tbsm = tbsm;
        this.lpsqqk = lpsqqk;
        this.wgqk = wgqk;
        this.zp = zp;
        this.zpsl = zpsl;
        this.lrOperator = lrOperator;
        this.operatorDate = operatorDate;
        this.lng = lng;
        this.lat = lat;
    }
    
    public String getFybh() {
        return this.fybh;
    }
    
    public void setFybh(String fybh) {
        this.fybh = fybh;
    }
    

    public Integer getSzss() {
        return this.szss;
    }
    
    public void setSzss(Integer szss) {
        this.szss = szss;
    }
    
    public Integer getCs() {
        return this.cs;
    }
    
    public void setCs(Integer cs) {
        this.cs = cs;
    }
    
    public Integer getQx() {
        return this.qx;
    }
    
    public void setQx(Integer qx) {
        this.qx = qx;
    }
    
    public Integer getQy() {
        return this.qy;
    }
    
    public void setQy(Integer qy) {
        this.qy = qy;
    }
    
    public String getFwzl() {
        return this.fwzl;
    }
    
    public void setFwzl(String fwzl) {
        this.fwzl = fwzl;
    }
    
    public BigDecimal getFwjzmj() {
        return this.fwjzmj;
    }
    
    public void setFwjzmj(BigDecimal fwjzmj) {
        this.fwjzmj = fwjzmj;
    }
    
    public String getFx() {
        return this.fx;
    }
    
    public void setFx(String fx) {
        this.fx = fx;
    }
    
    public Integer getSzlc() {
        return this.szlc;
    }
    
    public void setSzlc(Integer szlc) {
        this.szlc = szlc;
    }
    
    public Integer getSzzlc() {
        return this.szzlc;
    }
    
    public void setSzzlc(Integer szzlc) {
        this.szzlc = szzlc;
    }
    
    public String getFycx() {
        return this.fycx;
    }
    
    public void setFycx(String fycx) {
        this.fycx = fycx;
    }
    
    public String getFwjg() {
        return this.fwjg;
    }
    
    public void setFwjg(String fwjg) {
        this.fwjg = fwjg;
    }
    
    public String getFwyt() {
        return this.fwyt;
    }
    
    public void setFwyt(String fwyt) {
        this.fwyt = fwyt;
    }
    
    public String getZxcd() {
        return this.zxcd;
    }
    
    public void setZxcd(String zxcd) {
        this.zxcd = zxcd;
    }
    
    public String getFwzsSbcl() {
        return this.fwzsSbcl;
    }
    
    public void setFwzsSbcl(String fwzsSbcl) {
        this.fwzsSbcl = fwzsSbcl;
    }
    
    public String getFwwg() {
        return this.fwwg;
    }
    
    public void setFwwg(String fwwg) {
        this.fwwg = fwwg;
    }
    
    public Integer getJgnf() {
        return this.jgnf;
    }
    
    public void setJgnf(Integer jgnf) {
        this.jgnf = jgnf;
    }
    
    public String getQslb() {
        return this.qslb;
    }
    
    public void setQslb(String qslb) {
        this.qslb = qslb;
    }
    
    public String getSyxz() {
        return this.syxz;
    }
    
    public void setSyxz(String syxz) {
        this.syxz = syxz;
    }
    
    public String getGlfs() {
        return this.glfs;
    }
    
    public void setGlfs(String glfs) {
        this.glfs = glfs;
    }
    
    
    public String getPtss() {
        return this.ptss;
    }
    
    public void setPtss(String ptss) {
        this.ptss = ptss;
    }
    
    public String getJtxl() {
        return this.jtxl;
    }
    
    public void setJtxl(String jtxl) {
        this.jtxl = jtxl;
    }
    
    public String getTbsm() {
        return this.tbsm;
    }
    
    public void setTbsm(String tbsm) {
        this.tbsm = tbsm;
    }
    
    public String getLpsqqk() {
        return this.lpsqqk;
    }
    
    public void setLpsqqk(String lpsqqk) {
        this.lpsqqk = lpsqqk;
    }
    
    
    public String getWgqk() {
        return this.wgqk;
    }
    
    public void setWgqk(String wgqk) {
        this.wgqk = wgqk;
    }
    
    public String getZp() {
        return this.zp;
    }
    
    public void setZp(String zp) {
        this.zp = zp;
    }
    
    public Integer getZpsl() {
        return this.zpsl;
    }
    
    public void setZpsl(Integer zpsl) {
        this.zpsl = zpsl;
    }
    
    public String getLrOperator() {
        return this.lrOperator;
    }
    
    public void setLrOperator(String lrOperator) {
        this.lrOperator = lrOperator;
    }
    
    public Date getOperatorDate() {
        return this.operatorDate;
    }
    
    public void setOperatorDate(Date operatorDate) {
        this.operatorDate = operatorDate;
    }
    
    public String getLng() {
        return this.lng;
    }
    
    public void setLng(String lng) {
        this.lng = lng;
    }
    
    public String getLat() {
        return this.lat;
    }
    
    public void setLat(String lat) {
        this.lat = lat;
    }
    
}

