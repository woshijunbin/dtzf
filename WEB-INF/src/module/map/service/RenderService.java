package module.map.service;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.hibernate.SQLQuery;
import org.hibernate.Session;

import commom.daoUtil.HibernateUtil;
import module.map.entity.Fyxxb;
import module.map.entity.RenderDTO;
import module.map.form.FyxxbForm;

/**
 * @author User
 */
public class RenderService {
    
    /**
     * 获取城市下行政区信息
     * @param dm 城市代码
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<RenderDTO> listByCity(FyxxbForm form) {
        List<RenderDTO> dtos = null;
        StringBuilder builder = new StringBuilder();
        List<Object> where = new ArrayList<>(0);
        
        builder.append("  SELECT COUNT(F.FYBH), MIN(AMC), MIN(BMC), MIN(BDM), MIN(ADM) FROM fyxxb F  ");
        builder.append("    RIGHT JOIN  ");
        builder.append("        (SELECT A.DM AS 'ADM', A.MC AS 'AMC',B.DM AS 'BDM',B.MC AS 'BMC' FROM xzqhdm A, xzqhdm B WHERE B.PDM = A.DM AND B.PDM = ?) C  ");
        builder.append("        ON C.BDM = F.QX ");
        where.add(form.getF().getCs());
        
        if (form.getFwjzmj() != null && form.getFwjzmj() != 0 ) {
            if (form.getFwjzmj().equals(1)) {
                builder.append(" AND FWJZMJ < ? ");
                where.add(100);
            }else if (form.getFwjzmj().equals(2)) {
                builder.append(" AND FWJZMJ between 100 AND ? ");
                where.add(150);
            }else {
                builder.append(" AND FWJZMJ > ? ");
                where.add(150);
            }
        } 
        
        if (StringUtils.isNotBlank(form.getMaxLat())) {
            builder.append("AND LAT BETWEEN ? AND ? AND LNG BETWEEN  ? AND ?  ");
            where.add(form.getMinLat());
            where.add(form.getMaxLat());
            where.add(form.getMinLng());
            where.add(form.getMaxLng());
        }
        

        builder.append("   GROUP BY BDM ");
        Session session = HibernateUtil.getSession();
        try {
            SQLQuery q = session.createSQLQuery(builder.toString());
            for (int i = 0; i < where.size(); i++) {
                q.setParameter(i, where.get(i));
            } 
            List<Object[]> results = q.list();
            if (results != null) {
                dtos = new ArrayList<>(0);
                for (Object[] objArr : results) {
                    RenderDTO dto = new RenderDTO();
                    dto.setCount((Number)objArr[0]);
                    dto.setCity((String)objArr[1]);       
                    dto.setDistrict((String)objArr[2]);       
                    dto.setDistrictDm((Number)objArr[3]);       
                    dto.setCityDm((Number)objArr[4]);       
                    dtos.add(dto);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            HibernateUtil.closeSession(session);
        }
        return dtos;
    }
    
    
    
    /**
     * 获取行政区下街道信息
     * @param city 城市名称
     * @param district 行政区名称
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<RenderDTO> listByDistrict(FyxxbForm form) {
        List<RenderDTO> dtos = null;
        
        List<Object> where = new ArrayList<>(0);
        StringBuilder builder = new StringBuilder();
        Fyxxb f = form.getF();
        
        builder.append(" SELECT COUNT(FYBH), (SELECT MC FROM XZQHDM WHERE QX = DM) AS 'M1',  (SELECT MC FROM SQZDB WHERE QY = DM) AS 'M2', QY ");
        builder.append(" FROM FYXXB WHERE 1=1 ");
        
        if (StringUtils.isNotBlank(form.getMaxLat())) {
            builder.append(" AND LAT BETWEEN ? AND ? AND LNG BETWEEN  ? AND ?  ");
            where.add(form.getMinLat());
            where.add(form.getMaxLat());
            where.add(form.getMinLng());
            where.add(form.getMaxLng());
        }
        
        if (form.getFwjzmj() != null && !form.getFwjzmj().equals(0)) {
            if (form.getFwjzmj().equals(1)) {
                builder.append(" AND FWJZMJ < ? ");
                where.add(100);
            }else if (form.getFwjzmj().equals(2)) {
                builder.append(" AND FWJZMJ between 100 AND ? ");
                where.add(150);
            }else {
                builder.append(" AND FWJZMJ > ? ");
                where.add(150);
            }
        } 
        
        Integer csDm = f.getCs();
        if (csDm != null && csDm != 0) {
            builder.append(" AND CS = ? ");
            where.add(csDm);
        }        
        
        Integer districtDm = f.getQx();
        if (districtDm != null && districtDm != 0) {
            builder.append(" AND QX = ? ");
            where.add(districtDm);
        }
        
        Integer streetDm = f.getQy();
        if (streetDm != null && streetDm != 0) {
            builder.append(" AND QY =? ");
            where.add(streetDm);
        }
        
        builder.append(" GROUP BY QY,M1,M2 ");
        Session session = HibernateUtil.getSession();
        try {
            SQLQuery q = session.createSQLQuery(builder.toString());
            for (int i = 0; i < where.size(); i++) {
                q.setParameter(i, where.get(i));
            } 
            List<Object[]> results = q.list();
            if (results != null) {
                dtos = new ArrayList<>(0);
                for (Object[] objArr : results) {
                    RenderDTO dto = new RenderDTO();
                    dto.setCount((Number)objArr[0]);
                    dto.setDistrict((String)objArr[1]);
                    dto.setStreet((String)objArr[2]);
                    dto.setStreetDm((Number)objArr[3]);
                    dtos.add(dto);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            HibernateUtil.closeSession(session);
        }
        return dtos;
    }
 
    /**
     * 获取街道下各个坐标点的房源
     * @param qy 街道代码
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<RenderDTO> listByStreet(FyxxbForm form) {
        List<RenderDTO> dtos = null;
        
        StringBuilder builder = new StringBuilder();
        List<Object> where = new ArrayList<>(0);
        Fyxxb f = form.getF();
        
        Integer csDm = f.getCs();
        if (csDm != null && csDm != 0) {
            builder.append(" AND CS = ? ");
            where.add(csDm);
        }        
        
        Integer districtDm = f.getQx();
        if (districtDm != null && districtDm != 0) {
            builder.append(" AND QX = ? ");
            where.add(districtDm);
        }
        
        Integer streetDm = f.getQy();
        if (streetDm != null && streetDm != 0) {
            builder.append(" AND QY =? ");
            where.add(streetDm);
        }
        
        if (form.getFwjzmj() != null && !form.getFwjzmj().equals(0)) {
            if (form.getFwjzmj().equals(1)) {
                builder.append(" AND FWJZMJ < ? ");
                where.add(100);
            }else if (form.getFwjzmj().equals(2)) {
                builder.append(" AND FWJZMJ between 100 AND ? ");
                where.add(150);
            }else {
                builder.append(" AND FWJZMJ > ? ");
                where.add(150);
            }
        } 
        
        if (StringUtils.isNotBlank(f.getFwzl())) {
            builder.append("AND FWZL LIKE ?");
            where.add("%"+f.getFwzl()+"%");
        }
        
        if (StringUtils.isNotBlank(form.getMaxLat())) {
            builder.append("AND LAT BETWEEN ? AND ? AND LNG BETWEEN  ? AND ?  ");
            where.add(form.getMinLat());
            where.add(form.getMaxLat());
            where.add(form.getMinLng());
            where.add(form.getMaxLng());
        }
        
        String sql = "SELECT  COUNT(FYBH),  MIN(FWZL), MIN(LAT), MIN(LNG) FROM FYXXB WHERE 1=1 "+builder.toString()+" GROUP BY (LEFT(LNG,10)),(LEFT(LAT,9)) ";
        Session session = HibernateUtil.getSession();
        try {
            SQLQuery q = session.createSQLQuery(sql);
            for (int i = 0; i < where.size(); i++) {
                q.setParameter(i, where.get(i));
            } 
            List<Object[]> results = q.list();
            if (results != null) {
                dtos = new ArrayList<>(0);
                for (Object[] objArr : results) {
                    RenderDTO dto = new RenderDTO();
                    dto.setCount((Number)objArr[0]);
                    dto.setFwzl((String)objArr[1]);
                    dto.setLat((String)objArr[2]);
                    dto.setLng((String)objArr[3]);
                    dtos.add(dto);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            HibernateUtil.closeSession(session);
        }
        return dtos;
    }
    
}
