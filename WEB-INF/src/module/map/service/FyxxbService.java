package module.map.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;

import commom.daoUtil.HibernateUtil;
import module.map.entity.Fyxxb;
import module.map.form.FyxxbForm;

/**
 * @author User
 */
public class FyxxbService {
	
	@SuppressWarnings("unchecked")
	public List<Fyxxb> list(FyxxbForm form) {
	    Map<String, Object> where =new HashMap<String, Object>(0); 
	    Fyxxb f = form.getF();
		
	    if (StringUtils.isNotBlank(f.getFybh())) {
	        where.put("FYBH = ?", f.getFybh());
	    }
	    
	    if (f.getSzss() != null && f.getSzss() != 0) {
	        where.put("SZSS = ?", f.getSzss());
	    }
	    
	    if (f.getCs() != null && f.getCs() != 0) {
		    where.put("CS = ?", f.getCs());
		}
	    
        if (f.getQx() != null && f.getQx() != 0) {
            where.put("QX = ?", f.getQx());
        }
        
        if (f.getQy() != null && f.getQy() != 0) {
            where.put("QY = ?", f.getQy());
        }	
        
        if (StringUtils.isNotBlank(f.getLat())) {
            where.put("LAT like ?", f.getLat()+"%");
        }
        
        if (StringUtils.isNotBlank(f.getLng())) {
            where.put("LNG like ?", f.getLng()+"%");
        }
        
        if (StringUtils.isNotBlank(f.getFwzl())) {
            where.put("FWZL LIKE ?", "%"+f.getFwzl()+"%");
        }
        
        if (form.getFwjzmj() != null && !form.getFwjzmj().equals(0)) {
            if (form.getFwjzmj().equals(1)) {
                where.put("FWJZMJ < ?", 100);
            }else if (form.getFwjzmj().equals(2)) {
                where.put("FWJZMJ between 100 AND ?", 150);
            }else {
                where.put("FWJZMJ > ?", 150);
            }
        }		
        
        if (StringUtils.isNotBlank(form.getMaxLat())) {
            String[] arr = {form.getMinLat(), form.getMaxLat(), form.getMinLng(), form.getMaxLng()};
            where.put(" LAT BETWEEN ? AND ? AND LNG BETWEEN  ? AND ?  ", arr);
        }

        
        StringBuilder builder = new StringBuilder();
        builder.append(" ORDER BY ");
        String mj = form.getSortMj(); 
        if (StringUtils.isNotBlank(mj)) {
            System.err.println(mj.equals("0"));
            if (mj.equals("0")) {
                builder.append(" FWJZMJ  DESC, ");
            }else if (mj.equals("1")) {
                builder.append(" FWJZMJ  ASC, ");
            }
        }
        
        /*
        String price = form.getSortPrice();
        if (StringUtils.isNotBlank(price)) {
            if (price.equals('0')) {
                builder.append(" xxx  DESC, ");
            }else if (price.equals('1')) {
                builder.append(" xxx  ASC, ");
            }
        }
        */
        builder.append(" FYBH DESC ");
        try {
    		return HibernateUtil.listData(Fyxxb.class, where, form.getSp(), builder.toString());
        } catch (Exception e) {
            e.printStackTrace();
        }
		return new ArrayList<>(0);
	}

	public boolean save(Fyxxb f) {
	    f.setFybh("default"+Math.random());
		return HibernateUtil.insertData(f);
	}

	public boolean delete(String fybh) {
	    if(fybh != null && fybh.length()>0) {        
	        Object[][] where = {{"FYBH=?"},{fybh}};
	        return HibernateUtil.deleteData(Fyxxb.class,where);
	    }
	    return false;
	}
	
   public Fyxxb get(String fybh) {
        if (fybh != null && fybh.length() > 0) {
            Object[][] where = {{"FYBH=?"},{fybh}};
            Object obj = HibernateUtil.showData(Fyxxb.class, where, "");
             return (Fyxxb)obj ;
        }
        return null;
    }
	
	public boolean update(Fyxxb f) {
		return HibernateUtil.updateData(f, "FYBH");
	}
}
