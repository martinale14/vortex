--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: vortex; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA vortex;


ALTER SCHEMA vortex OWNER TO postgres;

--
-- Name: create_history(character varying, boolean, integer, integer, integer, integer, integer); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.create_history(status character varying, is_epic boolean, created_by integer, project_id integer, user_responsable_id integer, epic_parent_id integer, sprint_id integer) RETURNS integer
    LANGUAGE plpgsql
    AS $$
DECLARE
    myresult integer;
BEGIN 
  INSERT INTO vortex.histories (status_hist, is_epic_hist, created_by_hist, updated_by_hist, project_id_hist, user_responsable_id_hist, epic_parent_id_hist, sprint_id_hist)
   VALUES (create_history.status, 
           create_history.is_epic, 
           create_history.created_by, 
           create_history.created_by, 
           create_history.project_id, 
           create_history.user_responsable_id, 
           create_history.epic_parent_id, 
           create_history.sprint_id)
    RETURNING id_hist 
    INTO myresult;
    
    
    RETURN myresult;
 END;
    
    
$$;


ALTER FUNCTION vortex.create_history(status character varying, is_epic boolean, created_by integer, project_id integer, user_responsable_id integer, epic_parent_id integer, sprint_id integer) OWNER TO postgres;

--
-- Name: get_history_last_version(integer); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.get_history_last_version(id_history integer) RETURNS TABLE(id_vers integer, number_vers integer, title_vers character varying, description_vers character varying, is_base_doc_vers boolean, created_at_vers timestamp without time zone, updated_at_vers timestamp without time zone, history_id_vers integer, created_by_vers character varying, updated_by_vers character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE 
BEGIN
    RETURN QUERY
	SELECT vers.id_vers, 
		vers.number_vers, 
		vers.title_vers, 
		vers.description_vers, 
		vers.is_base_doc_vers, 
		vers.created_at_vers, 
		vers.updated_at_vers, 
		vers.history_id_vers, 
		usrcreate.name_user as created_by_vers, 
		usrupdate.name_user as updated_by_vers
	FROM vortex.versions vers
		LEFT JOIN vortex.users usrcreate ON vers.created_by_vers = usrcreate.id_user
		LEFT JOIN vortex.users usrupdate ON vers.updated_by_vers = usrupdate.id_user
	WHERE vers.number_vers = (
		SELECT MAX(subvers.number_vers)
		FROM vortex.versions subvers 
		WHERE subvers.history_id_vers = get_history_last_version.id_history)
	AND vers.history_id_vers = get_history_last_version.id_history;
END;
$$;


ALTER FUNCTION vortex.get_history_last_version(id_history integer) OWNER TO postgres;

--
-- Name: acceptance_criteria_id_acc_seq; Type: SEQUENCE; Schema: vortex; Owner: postgres
--

CREATE SEQUENCE vortex.acceptance_criteria_id_acc_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vortex.acceptance_criteria_id_acc_seq OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: acc_criterias; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.acc_criterias (
    id_acc integer DEFAULT nextval('vortex.acceptance_criteria_id_acc_seq'::regclass) NOT NULL,
    description_acc character varying(200) NOT NULL,
    type_acc character varying(15) NOT NULL,
    created_at_acc timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_acc timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by_acc integer NOT NULL,
    updated_by_acc integer NOT NULL,
    history_id_acc integer NOT NULL
);


ALTER TABLE vortex.acc_criterias OWNER TO postgres;

--
-- Name: insert_acc_criteria(character varying, character varying, integer, integer); Type: PROCEDURE; Schema: vortex; Owner: postgres
--

CREATE PROCEDURE vortex.insert_acc_criteria(IN description character varying, IN type character varying, IN created_by integer, IN history_id integer)
    LANGUAGE sql
    BEGIN ATOMIC
 INSERT INTO vortex.acc_criterias (description_acc, type_acc, created_by_acc, updated_by_acc, history_id_acc)
   VALUES (insert_acc_criteria.description, insert_acc_criteria.type, insert_acc_criteria.created_by, insert_acc_criteria.created_by, insert_acc_criteria.history_id);
END;


ALTER PROCEDURE vortex.insert_acc_criteria(IN description character varying, IN type character varying, IN created_by integer, IN history_id integer) OWNER TO postgres;

--
-- Name: companies_id_comp_seq; Type: SEQUENCE; Schema: vortex; Owner: postgres
--

CREATE SEQUENCE vortex.companies_id_comp_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vortex.companies_id_comp_seq OWNER TO postgres;

--
-- Name: companies; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.companies (
    id_comp integer DEFAULT nextval('vortex.companies_id_comp_seq'::regclass) NOT NULL,
    name_comp character varying(20) NOT NULL,
    email_comp character varying(70) NOT NULL,
    phone_comp character varying(12),
    direction_comp character varying(70),
    created_at_comp timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_comp timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by_comp integer NOT NULL,
    updated_by_comp integer NOT NULL
);


ALTER TABLE vortex.companies OWNER TO postgres;

--
-- Name: insert_company(character varying, character varying, character varying, character, integer); Type: PROCEDURE; Schema: vortex; Owner: postgres
--

CREATE PROCEDURE vortex.insert_company(IN name character varying, IN email character varying, IN phone character varying, IN direction character, IN created_by integer)
    LANGUAGE sql
    BEGIN ATOMIC
 INSERT INTO vortex.companies (name_comp, email_comp, phone_comp, direction_comp, created_by_comp, updated_by_comp)
   VALUES (insert_company.name, insert_company.email, insert_company.phone, insert_company.direction, insert_company.created_by, insert_company.created_by);
END;


ALTER PROCEDURE vortex.insert_company(IN name character varying, IN email character varying, IN phone character varying, IN direction character, IN created_by integer) OWNER TO postgres;

--
-- Name: projects_id_proj_seq; Type: SEQUENCE; Schema: vortex; Owner: postgres
--

CREATE SEQUENCE vortex.projects_id_proj_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vortex.projects_id_proj_seq OWNER TO postgres;

--
-- Name: projects; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.projects (
    id_proj integer DEFAULT nextval('vortex.projects_id_proj_seq'::regclass) NOT NULL,
    name_proj character varying(50) NOT NULL,
    estimated_time_proj integer,
    start_date_proj date,
    created_at_proj timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_proj timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by_proj integer NOT NULL,
    updated_by_proj integer NOT NULL,
    company_id_proj integer NOT NULL
);


ALTER TABLE vortex.projects OWNER TO postgres;

--
-- Name: insert_project(character varying, integer, date, integer, integer); Type: PROCEDURE; Schema: vortex; Owner: postgres
--

CREATE PROCEDURE vortex.insert_project(IN name character varying, IN estimated_time integer, IN start_date date, IN created_by integer, IN company_id integer)
    LANGUAGE sql
    BEGIN ATOMIC
 INSERT INTO vortex.projects (name_proj, estimated_time_proj, start_date_proj, created_by_proj, updated_by_proj, company_id_proj)
   VALUES (insert_project.name, insert_project.estimated_time, insert_project.start_date, insert_project.created_by, insert_project.created_by, insert_project.company_id);
END;


ALTER PROCEDURE vortex.insert_project(IN name character varying, IN estimated_time integer, IN start_date date, IN created_by integer, IN company_id integer) OWNER TO postgres;

--
-- Name: sprints_id_spri_seq; Type: SEQUENCE; Schema: vortex; Owner: postgres
--

CREATE SEQUENCE vortex.sprints_id_spri_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vortex.sprints_id_spri_seq OWNER TO postgres;

--
-- Name: sprints; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.sprints (
    id_spri integer DEFAULT nextval('vortex.sprints_id_spri_seq'::regclass) NOT NULL,
    start_date_spri date,
    end_date_spri date,
    status_spri character varying(10) NOT NULL,
    created_at_spri timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_spri timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by_spri integer NOT NULL,
    updated_by_spri integer NOT NULL,
    project_id_spri integer NOT NULL
);


ALTER TABLE vortex.sprints OWNER TO postgres;

--
-- Name: insert_sprint(date, date, character varying, integer, integer); Type: PROCEDURE; Schema: vortex; Owner: postgres
--

CREATE PROCEDURE vortex.insert_sprint(IN start_date date, IN end_date date, IN status character varying, IN created_by integer, IN project_id integer)
    LANGUAGE sql
    BEGIN ATOMIC
 INSERT INTO vortex.sprints (start_date_spri, end_date_spri, status_spri, created_by_spri, updated_by_spri, project_id_spri)
   VALUES (insert_sprint.start_date, insert_sprint.end_date, insert_sprint.status, insert_sprint.created_by, insert_sprint.created_by, insert_sprint.project_id);
END;


ALTER PROCEDURE vortex.insert_sprint(IN start_date date, IN end_date date, IN status character varying, IN created_by integer, IN project_id integer) OWNER TO postgres;

--
-- Name: users_id_user_seq; Type: SEQUENCE; Schema: vortex; Owner: postgres
--

CREATE SEQUENCE vortex.users_id_user_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vortex.users_id_user_seq OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.users (
    id_user integer DEFAULT nextval('vortex.users_id_user_seq'::regclass) NOT NULL,
    name_user character varying(40) NOT NULL,
    phone_user character varying(12),
    email_user character varying(70) NOT NULL,
    password_user character varying(100) NOT NULL,
    forgot_password_user boolean DEFAULT false NOT NULL,
    accepted_terms_user boolean DEFAULT false NOT NULL,
    created_at_user timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_user timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role_id_user integer NOT NULL,
    picture_url_user character varying(255)
);


ALTER TABLE vortex.users OWNER TO postgres;

--
-- Name: insert_user(character varying, character varying, character varying, character varying, character varying, integer); Type: PROCEDURE; Schema: vortex; Owner: postgres
--

CREATE PROCEDURE vortex.insert_user(IN name character varying, IN phone character varying, IN email character varying, IN password character varying, IN picture_url character varying, IN role_id integer)
    LANGUAGE sql
    BEGIN ATOMIC
 INSERT INTO vortex.users (name_user, phone_user, email_user, password_user, picture_url_user, role_id_user)
   VALUES (insert_user.name, insert_user.phone, insert_user.email, insert_user.password, insert_user.picture_url, insert_user.role_id);
END;


ALTER PROCEDURE vortex.insert_user(IN name character varying, IN phone character varying, IN email character varying, IN password character varying, IN picture_url character varying, IN role_id integer) OWNER TO postgres;

--
-- Name: insert_version(character varying, character varying, boolean, integer, integer); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.insert_version(title character varying, description character varying, is_base_doc boolean, created_by integer, history_id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	IF ( SELECT max(subvers.number_vers) AS max
				FROM vortex.versions subvers
			   WHERE (subvers.history_id_vers = insert_version.history_id)) IS NULL THEN
			INSERT INTO vortex.versions (number_vers, title_vers, description_vers, is_base_doc_vers, created_by_vers, updated_by_vers, history_id_vers)
			VALUES (1, insert_version.title, insert_version.description, insert_version.is_base_doc, insert_version.created_by, insert_version.created_by, insert_version.history_id);
	ELSE
	 INSERT INTO vortex.versions (number_vers, title_vers, description_vers, is_base_doc_vers, created_by_vers, updated_by_vers, history_id_vers)
	   VALUES ((( SELECT max(subvers.number_vers) AS max
				FROM vortex.versions subvers
			   WHERE (subvers.history_id_vers = insert_version.history_id)) + 1 ), insert_version.title, insert_version.description, insert_version.is_base_doc, insert_version.created_by, insert_version.created_by, insert_version.history_id);
	END IF;
END;
$$;


ALTER FUNCTION vortex.insert_version(title character varying, description character varying, is_base_doc boolean, created_by integer, history_id integer) OWNER TO postgres;

--
-- Name: insert_version(integer, character varying, character varying, boolean, integer, integer); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.insert_version(number_vers integer, title character varying, description character varying, is_base_doc boolean, created_by integer, history_id integer) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
	IF ( SELECT max(subvers.number_vers) AS max
				FROM vortex.versions subvers
			   WHERE (subvers.history_id_vers = insert_version.history_id)) IS NULL THEN
			INSERT INTO vortex.versions (number_vers, title_vers, description_vers, is_base_doc_vers, created_by_vers, updated_by_vers, history_id_vers)
			VALUES (insert_version.number_vers, insert_version.title, insert_version.description, insert_version.is_base_doc, insert_version.created_by, insert_version.created_by, insert_version.history_id);
	ELSE
	 INSERT INTO vortex.versions (number_vers, title_vers, description_vers, is_base_doc_vers, created_by_vers, updated_by_vers, history_id_vers)
	   VALUES ((( SELECT max(subvers.number_vers) AS max
				FROM vortex.versions subvers
			   WHERE (subvers.history_id_vers = insert_version.history_id)) + 1 ), insert_version.title, insert_version.description, insert_version.is_base_doc, insert_version.created_by, insert_version.created_by, insert_version.history_id);
	END IF;
END;
$$;


ALTER FUNCTION vortex.insert_version(number_vers integer, title character varying, description character varying, is_base_doc boolean, created_by integer, history_id integer) OWNER TO postgres;

--
-- Name: on_update_acc_criteria(); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.on_update_acc_criteria() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at_acc = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION vortex.on_update_acc_criteria() OWNER TO postgres;

--
-- Name: on_update_company(); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.on_update_company() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at_comp = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION vortex.on_update_company() OWNER TO postgres;

--
-- Name: on_update_history(); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.on_update_history() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at_hist = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION vortex.on_update_history() OWNER TO postgres;

--
-- Name: on_update_project(); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.on_update_project() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at_proj = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION vortex.on_update_project() OWNER TO postgres;

--
-- Name: on_update_role(); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.on_update_role() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at_role = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION vortex.on_update_role() OWNER TO postgres;

--
-- Name: on_update_sprint(); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.on_update_sprint() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at_spri = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION vortex.on_update_sprint() OWNER TO postgres;

--
-- Name: on_update_user(); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.on_update_user() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at_user = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION vortex.on_update_user() OWNER TO postgres;

--
-- Name: on_update_version(); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.on_update_version() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at_vers = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$;


ALTER FUNCTION vortex.on_update_version() OWNER TO postgres;

--
-- Name: select_acc_by_history(integer); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.select_acc_by_history(history_id integer) RETURNS TABLE(id_acc integer, description_acc character varying, type_acc character varying, created_at_acc timestamp without time zone, updated_at_acc timestamp without time zone, history_id_acc integer, created_by_spri character varying, updated_by_spri character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  RETURN QUERY SELECT 
  	acc.id_acc,
    acc.description_acc,
    acc.type_acc,
    acc.created_at_acc,
    acc.updated_at_acc,
    acc.history_id_acc,
  	usrcreate.name_user AS created_by_acc,
  	usrupdate.name_user AS updated_by_acc
  FROM vortex.acc_criterias acc
  LEFT JOIN vortex.users usrcreate ON acc.created_by_acc = usrcreate.id_user
  LEFT JOIN vortex.users usrupdate ON acc.updated_by_acc = usrupdate.id_user
  WHERE acc.history_id_acc = select_acc_by_history.history_id;
END;
$$;


ALTER FUNCTION vortex.select_acc_by_history(history_id integer) OWNER TO postgres;

--
-- Name: select_history_by_project(integer); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.select_history_by_project(project_id integer) RETURNS TABLE(id_hist integer, status_hist character varying, is_epic_hist boolean, created_at_hist timestamp without time zone, updated_at_hist timestamp without time zone, project_id_hist integer, user_responsable_id_hist integer, epic_parent_id_hist integer, sprint_id_hist integer, created_by_hist character varying, updated_by_hist character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  RETURN QUERY SELECT 
  	hist.id_hist,
    hist.status_hist,
    hist.is_epic_hist,
    hist.created_at_hist,
    hist.updated_at_hist, 
    hist.project_id_hist,
    hist.user_responsable_id_hist,
    hist.epic_parent_id_hist,
    hist.sprint_id_hist,
  	usrcreate.name_user AS created_by_hist,
  	usrupdate.name_user AS updated_by_hist
  FROM vortex.histories hist
  LEFT JOIN vortex.users usrcreate ON hist.created_by_hist = usrcreate.id_user
  LEFT JOIN vortex.users usrupdate ON hist.updated_by_hist = usrupdate.id_user
  WHERE hist.project_id_hist = select_history_by_project.project_id;
END;
$$;


ALTER FUNCTION vortex.select_history_by_project(project_id integer) OWNER TO postgres;

--
-- Name: select_history_by_sprint(integer); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.select_history_by_sprint(sprint_id integer) RETURNS TABLE(id_hist integer, status_hist character varying, is_epic_hist boolean, created_at_hist timestamp without time zone, updated_at_hist timestamp without time zone, project_id_hist integer, user_responsable_id_hist integer, epic_parent_id_hist integer, sprint_id_hist integer, created_by_hist character varying, updated_by_hist character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  RETURN QUERY SELECT 
  	hist.id_hist,
    hist.status_hist,
    hist.is_epic_hist,
    hist.created_at_hist,
    hist.updated_at_hist, 
    hist.project_id_hist,
    hist.user_responsable_id_hist,
    hist.epic_parent_id_hist,
    hist.sprint_id_hist,
  	usrcreate.name_user AS created_by_hist,
  	usrupdate.name_user AS updated_by_hist
  FROM vortex.histories hist
  LEFT JOIN vortex.users usrcreate ON hist.created_by_hist = usrcreate.id_user
  LEFT JOIN vortex.users usrupdate ON hist.updated_by_hist = usrupdate.id_user
  WHERE hist.sprint_id_hist = select_history_by_sprint.sprint_id;
END;
$$;


ALTER FUNCTION vortex.select_history_by_sprint(sprint_id integer) OWNER TO postgres;

--
-- Name: select_project_by_company(integer); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.select_project_by_company(company_id integer) RETURNS TABLE(id_proj integer, name_proj character varying, estimated_time_proj integer, start_date_proj date, created_at_proj timestamp without time zone, updated_at_proj timestamp without time zone, company_id_proj integer, created_by_proj character varying, updated_by_proj character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  RETURN QUERY SELECT proj.id_proj, 
    proj.name_proj, 
    proj.estimated_time_proj, 
    proj.start_date_proj, 
    proj.created_at_proj, 
    proj.updated_at_proj, 
    proj.company_id_proj,
  	usrcreate.name_user AS created_by_proj,
  	usrupdate.name_user AS updated_by_proj
  FROM vortex.projects proj
  LEFT JOIN vortex.users usrcreate ON proj.created_by_proj = usrcreate.id_user
  LEFT JOIN vortex.users usrupdate ON proj.updated_by_proj = usrupdate.id_user
  WHERE proj.company_id_proj = select_project_by_company.company_id;
END;
$$;


ALTER FUNCTION vortex.select_project_by_company(company_id integer) OWNER TO postgres;

--
-- Name: select_sprint_by_project(integer); Type: FUNCTION; Schema: vortex; Owner: postgres
--

CREATE FUNCTION vortex.select_sprint_by_project(project_id integer) RETURNS TABLE(id_spri integer, start_date_spri date, end_date_spri date, status_spri character varying, created_at_spri timestamp without time zone, updated_at_spri timestamp without time zone, project_id_spri integer, created_by_spri character varying, updated_by_spri character varying)
    LANGUAGE plpgsql
    AS $$
DECLARE
BEGIN
  RETURN QUERY SELECT spri.id_spri,
	spri.start_date_spri,
	spri.end_date_spri,
	spri.status_spri,
	spri.created_at_spri,
	spri.updated_at_spri,
	spri.project_id_spri,
  	usrcreate.name_user AS created_by_spri,
  	usrupdate.name_user AS updated_by_spri
  FROM vortex.sprints spri
  LEFT JOIN vortex.users usrcreate ON spri.created_by_spri = usrcreate.id_user
  LEFT JOIN vortex.users usrupdate ON spri.updated_by_spri = usrupdate.id_user
  WHERE spri.project_id_spri = select_sprint_by_project.project_id
  ORDER BY spri.start_date_spri ASC;
END;
$$;


ALTER FUNCTION vortex.select_sprint_by_project(project_id integer) OWNER TO postgres;

--
-- Name: allCompanies; Type: VIEW; Schema: vortex; Owner: postgres
--

CREATE VIEW vortex."allCompanies" AS
 SELECT comp.id_comp,
    comp.name_comp,
    comp.email_comp,
    comp.phone_comp,
    comp.direction_comp,
    comp.created_at_comp,
    comp.updated_at_comp,
    usrcreate.name_user AS created_by_comp,
    usrupdate.name_user AS updated_by_comp
   FROM ((vortex.companies comp
     LEFT JOIN vortex.users usrcreate ON ((comp.created_by_comp = usrcreate.id_user)))
     LEFT JOIN vortex.users usrupdate ON ((comp.updated_by_comp = usrupdate.id_user)));


ALTER TABLE vortex."allCompanies" OWNER TO postgres;

--
-- Name: histories_id_hist_seq; Type: SEQUENCE; Schema: vortex; Owner: postgres
--

CREATE SEQUENCE vortex.histories_id_hist_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vortex.histories_id_hist_seq OWNER TO postgres;

--
-- Name: histories; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.histories (
    id_hist integer DEFAULT nextval('vortex.histories_id_hist_seq'::regclass) NOT NULL,
    status_hist character varying(12) NOT NULL,
    is_epic_hist boolean DEFAULT false NOT NULL,
    created_at_hist timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_hist timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by_hist integer NOT NULL,
    updated_by_hist integer NOT NULL,
    project_id_hist integer NOT NULL,
    user_responsable_id_hist integer,
    epic_parent_id_hist integer,
    sprint_id_hist integer
);


ALTER TABLE vortex.histories OWNER TO postgres;

--
-- Name: roles_id_role_seq; Type: SEQUENCE; Schema: vortex; Owner: postgres
--

CREATE SEQUENCE vortex.roles_id_role_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vortex.roles_id_role_seq OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.roles (
    id_role integer DEFAULT nextval('vortex.roles_id_role_seq'::regclass) NOT NULL,
    name_role character varying(20) NOT NULL,
    created_at_role timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_role timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE vortex.roles OWNER TO postgres;

--
-- Name: versions_id_vers_seq; Type: SEQUENCE; Schema: vortex; Owner: postgres
--

CREATE SEQUENCE vortex.versions_id_vers_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE vortex.versions_id_vers_seq OWNER TO postgres;

--
-- Name: versions; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.versions (
    id_vers integer DEFAULT nextval('vortex.versions_id_vers_seq'::regclass) NOT NULL,
    number_vers integer NOT NULL,
    title_vers character varying(100) NOT NULL,
    description_vers character varying(250) NOT NULL,
    is_base_doc_vers boolean DEFAULT false NOT NULL,
    created_at_vers timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_vers timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by_vers integer NOT NULL,
    updated_by_vers integer NOT NULL,
    history_id_vers integer NOT NULL
);


ALTER TABLE vortex.versions OWNER TO postgres;

--
-- Data for Name: acc_criterias; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.acc_criterias (id_acc, description_acc, type_acc, created_at_acc, updated_at_acc, created_by_acc, updated_by_acc, history_id_acc) FROM stdin;
2	El background de la aplicaión debe ser rosado	DOUI	2022-04-20 21:09:32.60977	2022-04-20 21:09:32.60977	13	13	3
3	El background de la aplicaión debe ser rosado	DOUI	2022-04-20 21:09:32.668104	2022-04-20 21:09:32.668104	13	13	3
4	El background de la aplicaión debe ser rosado	DOUI	2022-04-20 21:09:32.67025	2022-04-20 21:09:32.67025	13	13	3
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.companies (id_comp, name_comp, email_comp, phone_comp, direction_comp, created_at_comp, updated_at_comp, created_by_comp, updated_by_comp) FROM stdin;
2	GoLiving	goLiving@gmail.com	\N	\N	2022-04-20 04:54:00.643967	2022-04-20 05:12:05.863141	5	13
3	America de Cali	america@cali.com	\N	Avenida estadio	2022-04-20 05:35:28.207545	2022-04-20 05:35:28.207545	13	13
4	Ricardo Creativo	ricardoCreativo@hotmail.com	574178543291	Carrera 29 # 24 73	2022-04-20 05:37:01.959089	2022-04-20 05:37:01.959089	5	5
\.


--
-- Data for Name: histories; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.histories (id_hist, status_hist, is_epic_hist, created_at_hist, updated_at_hist, created_by_hist, updated_by_hist, project_id_hist, user_responsable_id_hist, epic_parent_id_hist, sprint_id_hist) FROM stdin;
2	open	f	2022-04-20 21:06:46.537814	2022-04-20 22:49:01.274622	13	13	2	\N	\N	3
3	open	f	2022-04-20 21:09:32.561419	2022-04-20 22:49:01.274622	13	13	2	\N	\N	3
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.projects (id_proj, name_proj, estimated_time_proj, start_date_proj, created_at_proj, updated_at_proj, created_by_proj, updated_by_proj, company_id_proj) FROM stdin;
2	estr	40	2022-04-22	2022-04-20 10:00:43.626271	2022-04-20 10:00:43.626271	5	5	2
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.roles (id_role, name_role, created_at_role, updated_at_role) FROM stdin;
1	Administrador	2022-04-14 16:22:50.079356	2022-04-14 19:28:15.090148
\.


--
-- Data for Name: sprints; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.sprints (id_spri, start_date_spri, end_date_spri, status_spri, created_at_spri, updated_at_spri, created_by_spri, updated_by_spri, project_id_spri) FROM stdin;
3	2022-04-22	2022-04-30	open	2022-04-20 10:11:41.183355	2022-04-20 10:11:41.183355	5	5	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.users (id_user, name_user, phone_user, email_user, password_user, forgot_password_user, accepted_terms_user, created_at_user, updated_at_user, role_id_user, picture_url_user) FROM stdin;
5	Martín Alejandro Escobar Espinel	\N	martinale4@hotmail.com	$2b$10$sEfLC/SeytVrthXRD0NqOOkjIFwZAsF1fthQcTgGUrkoRBzW6/oFi	f	f	2022-04-19 11:08:04.325309	2022-04-19 17:31:35.038145	1	https://res.cloudinary.com/dhlvkhuhz/image/upload/v1650363525/vortex/profile_pictures/01_i24e1l.jpg
13	Camilo Bolañis	\N	bolañoselpapi@hotmail.com	$2b$10$lOh0iUdeozj7hJyR.2vB2uhWcq0t0Nq9dR9nibmqhHq8WDUGDdmla	f	f	2022-04-19 12:49:48.360245	2022-04-19 17:31:35.038145	1	https://res.cloudinary.com/dhlvkhuhz/image/upload/v1650363525/vortex/profile_pictures/01_i24e1l.jpg
\.


--
-- Data for Name: versions; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.versions (id_vers, number_vers, title_vers, description_vers, is_base_doc_vers, created_at_vers, updated_at_vers, created_by_vers, updated_by_vers, history_id_vers) FROM stdin;
3	1	El administrador necesita entrar al sistema para administrarlo	El administrador debe entrar al sistema porque sus funciones principales son las de crear, editar y eliminar usuarios	f	2022-04-20 21:08:49.443487	2022-04-20 21:08:49.443487	5	5	2
4	2	El administrador necesita entrar al sistema para administrarlo	El administrador debe entrar al sistema porque sus funciones principales son las de crear, editar y eliminar usuarios	f	2022-04-20 21:09:01.542735	2022-04-20 21:09:01.542735	5	5	2
5	1	El administrador necesita entrar al sistema para administrarlo	El administrador debe entrar al sistema porque sus funciones principales son las de crear, editar y eliminar usuarios	f	2022-04-20 21:09:32.604609	2022-04-20 21:09:32.604609	13	13	3
\.


--
-- Name: acceptance_criteria_id_acc_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.acceptance_criteria_id_acc_seq', 4, true);


--
-- Name: companies_id_comp_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.companies_id_comp_seq', 4, true);


--
-- Name: histories_id_hist_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.histories_id_hist_seq', 3, true);


--
-- Name: projects_id_proj_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.projects_id_proj_seq', 3, true);


--
-- Name: roles_id_role_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.roles_id_role_seq', 1, true);


--
-- Name: sprints_id_spri_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.sprints_id_spri_seq', 3, true);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.users_id_user_seq', 14, true);


--
-- Name: versions_id_vers_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.versions_id_vers_seq', 5, true);


--
-- Name: acc_criterias acceptance_criteria_pkey; Type: CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.acc_criterias
    ADD CONSTRAINT acceptance_criteria_pkey PRIMARY KEY (id_acc);


--
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id_comp);


--
-- Name: histories histories_pkey; Type: CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.histories
    ADD CONSTRAINT histories_pkey PRIMARY KEY (id_hist);


--
-- Name: projects projects_pkey; Type: CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.projects
    ADD CONSTRAINT projects_pkey PRIMARY KEY (id_proj);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (id_role);


--
-- Name: sprints sprints_pkey; Type: CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.sprints
    ADD CONSTRAINT sprints_pkey PRIMARY KEY (id_spri);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.users
    ADD CONSTRAINT unique_email UNIQUE (email_user);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id_user);


--
-- Name: versions versions_pkey; Type: CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.versions
    ADD CONSTRAINT versions_pkey PRIMARY KEY (id_vers);


--
-- Name: acc_criterias on_update; Type: TRIGGER; Schema: vortex; Owner: postgres
--

CREATE TRIGGER on_update BEFORE UPDATE ON vortex.acc_criterias FOR EACH ROW EXECUTE FUNCTION vortex.on_update_acc_criteria();


--
-- Name: companies on_update; Type: TRIGGER; Schema: vortex; Owner: postgres
--

CREATE TRIGGER on_update BEFORE UPDATE ON vortex.companies FOR EACH ROW EXECUTE FUNCTION vortex.on_update_company();


--
-- Name: histories on_update; Type: TRIGGER; Schema: vortex; Owner: postgres
--

CREATE TRIGGER on_update BEFORE UPDATE ON vortex.histories FOR EACH ROW EXECUTE FUNCTION vortex.on_update_history();


--
-- Name: projects on_update; Type: TRIGGER; Schema: vortex; Owner: postgres
--

CREATE TRIGGER on_update BEFORE UPDATE ON vortex.projects FOR EACH ROW EXECUTE FUNCTION vortex.on_update_project();


--
-- Name: roles on_update; Type: TRIGGER; Schema: vortex; Owner: postgres
--

CREATE TRIGGER on_update BEFORE UPDATE ON vortex.roles FOR EACH ROW EXECUTE FUNCTION vortex.on_update_role();


--
-- Name: sprints on_update; Type: TRIGGER; Schema: vortex; Owner: postgres
--

CREATE TRIGGER on_update BEFORE UPDATE ON vortex.sprints FOR EACH ROW EXECUTE FUNCTION vortex.on_update_sprint();


--
-- Name: users on_update; Type: TRIGGER; Schema: vortex; Owner: postgres
--

CREATE TRIGGER on_update BEFORE UPDATE ON vortex.users FOR EACH ROW EXECUTE FUNCTION vortex.on_update_user();


--
-- Name: versions on_update; Type: TRIGGER; Schema: vortex; Owner: postgres
--

CREATE TRIGGER on_update BEFORE UPDATE ON vortex.versions FOR EACH ROW EXECUTE FUNCTION vortex.on_update_version();


--
-- Name: projects fk_company_id; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.projects
    ADD CONSTRAINT fk_company_id FOREIGN KEY (company_id_proj) REFERENCES vortex.companies(id_comp) NOT VALID;


--
-- Name: companies fk_created_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.companies
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by_comp) REFERENCES vortex.users(id_user);


--
-- Name: projects fk_created_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.projects
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by_proj) REFERENCES vortex.users(id_user);


--
-- Name: sprints fk_created_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.sprints
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by_spri) REFERENCES vortex.users(id_user);


--
-- Name: histories fk_created_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.histories
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by_hist) REFERENCES vortex.users(id_user);


--
-- Name: acc_criterias fk_created_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.acc_criterias
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by_acc) REFERENCES vortex.users(id_user) NOT VALID;


--
-- Name: versions fk_created_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.versions
    ADD CONSTRAINT fk_created_by FOREIGN KEY (created_by_vers) REFERENCES vortex.users(id_user);


--
-- Name: histories fk_epic_parent_id; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.histories
    ADD CONSTRAINT fk_epic_parent_id FOREIGN KEY (epic_parent_id_hist) REFERENCES vortex.histories(id_hist) NOT VALID;


--
-- Name: acc_criterias fk_history_id; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.acc_criterias
    ADD CONSTRAINT fk_history_id FOREIGN KEY (history_id_acc) REFERENCES vortex.histories(id_hist) NOT VALID;


--
-- Name: versions fk_history_id; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.versions
    ADD CONSTRAINT fk_history_id FOREIGN KEY (history_id_vers) REFERENCES vortex.histories(id_hist);


--
-- Name: sprints fk_project_id; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.sprints
    ADD CONSTRAINT fk_project_id FOREIGN KEY (project_id_spri) REFERENCES vortex.projects(id_proj) NOT VALID;


--
-- Name: histories fk_project_id; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.histories
    ADD CONSTRAINT fk_project_id FOREIGN KEY (project_id_hist) REFERENCES vortex.projects(id_proj) NOT VALID;


--
-- Name: users fk_role; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.users
    ADD CONSTRAINT fk_role FOREIGN KEY (role_id_user) REFERENCES vortex.roles(id_role) NOT VALID;


--
-- Name: histories fk_sprint_id; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.histories
    ADD CONSTRAINT fk_sprint_id FOREIGN KEY (sprint_id_hist) REFERENCES vortex.sprints(id_spri);


--
-- Name: companies fk_updated_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.companies
    ADD CONSTRAINT fk_updated_by FOREIGN KEY (updated_by_comp) REFERENCES vortex.users(id_user);


--
-- Name: projects fk_updated_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.projects
    ADD CONSTRAINT fk_updated_by FOREIGN KEY (updated_by_proj) REFERENCES vortex.users(id_user);


--
-- Name: sprints fk_updated_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.sprints
    ADD CONSTRAINT fk_updated_by FOREIGN KEY (updated_by_spri) REFERENCES vortex.users(id_user);


--
-- Name: histories fk_updated_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.histories
    ADD CONSTRAINT fk_updated_by FOREIGN KEY (updated_by_hist) REFERENCES vortex.users(id_user);


--
-- Name: acc_criterias fk_updated_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.acc_criterias
    ADD CONSTRAINT fk_updated_by FOREIGN KEY (updated_by_acc) REFERENCES vortex.users(id_user) NOT VALID;


--
-- Name: versions fk_updated_by; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.versions
    ADD CONSTRAINT fk_updated_by FOREIGN KEY (updated_by_vers) REFERENCES vortex.users(id_user);


--
-- Name: histories fk_user_responsable_id; Type: FK CONSTRAINT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.histories
    ADD CONSTRAINT fk_user_responsable_id FOREIGN KEY (user_responsable_id_hist) REFERENCES vortex.users(id_user);


--
-- Name: SCHEMA vortex; Type: ACL; Schema: -; Owner: postgres
--

GRANT USAGE ON SCHEMA vortex TO vortex_admin;


--
-- Name: SEQUENCE acceptance_criteria_id_acc_seq; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT USAGE ON SEQUENCE vortex.acceptance_criteria_id_acc_seq TO vortex_admin;


--
-- Name: TABLE acc_criterias; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.acc_criterias TO vortex_admin;


--
-- Name: SEQUENCE companies_id_comp_seq; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT USAGE ON SEQUENCE vortex.companies_id_comp_seq TO vortex_admin;


--
-- Name: TABLE companies; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.companies TO vortex_admin;


--
-- Name: SEQUENCE projects_id_proj_seq; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT USAGE ON SEQUENCE vortex.projects_id_proj_seq TO vortex_admin;


--
-- Name: TABLE projects; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.projects TO vortex_admin;


--
-- Name: SEQUENCE sprints_id_spri_seq; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT USAGE ON SEQUENCE vortex.sprints_id_spri_seq TO vortex_admin;


--
-- Name: TABLE sprints; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.sprints TO vortex_admin;


--
-- Name: SEQUENCE users_id_user_seq; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT USAGE ON SEQUENCE vortex.users_id_user_seq TO vortex_admin;


--
-- Name: TABLE users; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.users TO vortex_admin;


--
-- Name: TABLE "allCompanies"; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex."allCompanies" TO vortex_admin;


--
-- Name: SEQUENCE histories_id_hist_seq; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT USAGE ON SEQUENCE vortex.histories_id_hist_seq TO vortex_admin;


--
-- Name: TABLE histories; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.histories TO vortex_admin;


--
-- Name: SEQUENCE roles_id_role_seq; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT USAGE ON SEQUENCE vortex.roles_id_role_seq TO vortex_admin;


--
-- Name: TABLE roles; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.roles TO vortex_admin;


--
-- Name: SEQUENCE versions_id_vers_seq; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT USAGE ON SEQUENCE vortex.versions_id_vers_seq TO vortex_admin;


--
-- Name: TABLE versions; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.versions TO vortex_admin;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: vortex; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA vortex GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO vortex_admin;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO vortex_admin;


--
-- PostgreSQL database dump complete
--

