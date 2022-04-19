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

SET default_tablespace = '';

SET default_table_access_method = heap;

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
    profile_picture_url_user character varying(255)
);


ALTER TABLE vortex.users OWNER TO postgres;

--
-- Name: insert_user(character varying, character varying, character varying, character varying, integer); Type: PROCEDURE; Schema: vortex; Owner: postgres
--

CREATE PROCEDURE vortex.insert_user(IN name character varying, IN phone character varying, IN email character varying, IN password character varying, IN role_id integer)
    LANGUAGE sql
    BEGIN ATOMIC
 INSERT INTO vortex.users (name_user, phone_user, email_user, password_user, role_id_user)
   VALUES (insert_user.name, insert_user.phone, insert_user.email, insert_user.password, insert_user.role_id);
END;


ALTER PROCEDURE vortex.insert_user(IN name character varying, IN phone character varying, IN email character varying, IN password character varying, IN role_id integer) OWNER TO postgres;

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
-- Name: acc_criterias; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.acc_criterias (
    id_acc integer NOT NULL,
    description_acc character varying(70) NOT NULL,
    type_acc character varying(15) NOT NULL,
    created_at_acc timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_acc timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    created_by_acc integer NOT NULL,
    updated_by_acc integer NOT NULL,
    history_id_acc integer NOT NULL
);


ALTER TABLE vortex.acc_criterias OWNER TO postgres;

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

--
-- Name: acceptance_criteria_id_acc_seq; Type: SEQUENCE OWNED BY; Schema: vortex; Owner: postgres
--

ALTER SEQUENCE vortex.acceptance_criteria_id_acc_seq OWNED BY vortex.acc_criterias.id_acc;


--
-- Name: companies; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.companies (
    id_comp integer NOT NULL,
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
-- Name: companies_id_comp_seq; Type: SEQUENCE OWNED BY; Schema: vortex; Owner: postgres
--

ALTER SEQUENCE vortex.companies_id_comp_seq OWNED BY vortex.companies.id_comp;


--
-- Name: histories; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.histories (
    id_hist integer NOT NULL,
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
-- Name: histories_id_hist_seq; Type: SEQUENCE OWNED BY; Schema: vortex; Owner: postgres
--

ALTER SEQUENCE vortex.histories_id_hist_seq OWNED BY vortex.histories.id_hist;


--
-- Name: projects; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.projects (
    id_proj integer NOT NULL,
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
-- Name: projects_id_proj_seq; Type: SEQUENCE OWNED BY; Schema: vortex; Owner: postgres
--

ALTER SEQUENCE vortex.projects_id_proj_seq OWNED BY vortex.projects.id_proj;


--
-- Name: roles; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.roles (
    id_role integer NOT NULL,
    name_role character varying(20) NOT NULL,
    created_at_role timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at_role timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE vortex.roles OWNER TO postgres;

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
-- Name: roles_id_role_seq; Type: SEQUENCE OWNED BY; Schema: vortex; Owner: postgres
--

ALTER SEQUENCE vortex.roles_id_role_seq OWNED BY vortex.roles.id_role;


--
-- Name: sprints; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.sprints (
    id_spri integer NOT NULL,
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
-- Name: sprints_id_spri_seq; Type: SEQUENCE OWNED BY; Schema: vortex; Owner: postgres
--

ALTER SEQUENCE vortex.sprints_id_spri_seq OWNED BY vortex.sprints.id_spri;


--
-- Name: versions; Type: TABLE; Schema: vortex; Owner: postgres
--

CREATE TABLE vortex.versions (
    id_vers integer NOT NULL,
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
-- Name: versions_id_vers_seq; Type: SEQUENCE OWNED BY; Schema: vortex; Owner: postgres
--

ALTER SEQUENCE vortex.versions_id_vers_seq OWNED BY vortex.versions.id_vers;


--
-- Name: acc_criterias id_acc; Type: DEFAULT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.acc_criterias ALTER COLUMN id_acc SET DEFAULT nextval('vortex.acceptance_criteria_id_acc_seq'::regclass);


--
-- Name: companies id_comp; Type: DEFAULT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.companies ALTER COLUMN id_comp SET DEFAULT nextval('vortex.companies_id_comp_seq'::regclass);


--
-- Name: histories id_hist; Type: DEFAULT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.histories ALTER COLUMN id_hist SET DEFAULT nextval('vortex.histories_id_hist_seq'::regclass);


--
-- Name: projects id_proj; Type: DEFAULT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.projects ALTER COLUMN id_proj SET DEFAULT nextval('vortex.projects_id_proj_seq'::regclass);


--
-- Name: roles id_role; Type: DEFAULT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.roles ALTER COLUMN id_role SET DEFAULT nextval('vortex.roles_id_role_seq'::regclass);


--
-- Name: sprints id_spri; Type: DEFAULT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.sprints ALTER COLUMN id_spri SET DEFAULT nextval('vortex.sprints_id_spri_seq'::regclass);


--
-- Name: versions id_vers; Type: DEFAULT; Schema: vortex; Owner: postgres
--

ALTER TABLE ONLY vortex.versions ALTER COLUMN id_vers SET DEFAULT nextval('vortex.versions_id_vers_seq'::regclass);


--
-- Data for Name: acc_criterias; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.acc_criterias (id_acc, description_acc, type_acc, created_at_acc, updated_at_acc, created_by_acc, updated_by_acc, history_id_acc) FROM stdin;
1	El fonde debe ser amarillo	DOUI	2022-04-14 19:30:43.622767	2022-04-14 19:30:43.622767	1	1	1
\.


--
-- Data for Name: companies; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.companies (id_comp, name_comp, email_comp, phone_comp, direction_comp, created_at_comp, updated_at_comp, created_by_comp, updated_by_comp) FROM stdin;
2	GoLiving	GoLiving@Living.com	573185824979	Avenida 3 norte - #36	2022-04-14 17:19:46.906394	2022-04-14 17:19:46.906394	1	1
\.


--
-- Data for Name: histories; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.histories (id_hist, status_hist, is_epic_hist, created_at_hist, updated_at_hist, created_by_hist, updated_by_hist, project_id_hist, user_responsable_id_hist, epic_parent_id_hist, sprint_id_hist) FROM stdin;
1	OPEN	f	2022-04-14 19:13:40.236472	2022-04-14 19:15:28.995536	1	1	1	1	2	\N
2	OPEN	t	2022-04-14 19:14:05.018772	2022-04-14 19:16:26.166149	1	1	1	1	\N	1
\.


--
-- Data for Name: projects; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.projects (id_proj, name_proj, estimated_time_proj, start_date_proj, created_at_proj, updated_at_proj, created_by_proj, updated_by_proj, company_id_proj) FROM stdin;
1	Sistema de compras	25	2022-10-02	2022-04-14 18:45:24.17918	2022-04-14 18:45:24.17918	1	1	2
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
1	2022-10-15	2022-10-30	OPEN	2022-04-14 19:07:27.02559	2022-04-14 19:07:27.02559	1	1	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.users (id_user, name_user, phone_user, email_user, password_user, forgot_password_user, accepted_terms_user, created_at_user, updated_at_user, role_id_user, profile_picture_url_user) FROM stdin;
1	Martin Alejandro Escobar Espinel	573185824979	martinale4@hotmail.com	Chechonito14	f	f	2022-04-14 17:19:26.699591	2022-04-14 17:19:26.699591	1	\N
2	Juan Pablo Rivera	573185824979	juanpari1766@gmail.com	Juanpari176600QA	f	f	2022-04-14 21:06:44.087942	2022-04-14 21:06:44.087942	1	\N
\.


--
-- Data for Name: versions; Type: TABLE DATA; Schema: vortex; Owner: postgres
--

COPY vortex.versions (id_vers, number_vers, title_vers, description_vers, is_base_doc_vers, created_at_vers, updated_at_vers, created_by_vers, updated_by_vers, history_id_vers) FROM stdin;
3	1	El usuario debe poder registrarse	El usuario general debe poder registrarse para ingresar al proyecto	f	2022-04-14 19:33:32.94117	2022-04-14 19:33:32.94117	1	1	1
\.


--
-- Name: acceptance_criteria_id_acc_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.acceptance_criteria_id_acc_seq', 1, true);


--
-- Name: companies_id_comp_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.companies_id_comp_seq', 2, true);


--
-- Name: histories_id_hist_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.histories_id_hist_seq', 2, true);


--
-- Name: projects_id_proj_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.projects_id_proj_seq', 1, true);


--
-- Name: roles_id_role_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.roles_id_role_seq', 1, true);


--
-- Name: sprints_id_spri_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.sprints_id_spri_seq', 1, true);


--
-- Name: users_id_user_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.users_id_user_seq', 24, true);


--
-- Name: versions_id_vers_seq; Type: SEQUENCE SET; Schema: vortex; Owner: postgres
--

SELECT pg_catalog.setval('vortex.versions_id_vers_seq', 3, true);


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
    ADD CONSTRAINT fk_project_id FOREIGN KEY (project_id_hist) REFERENCES vortex.users(id_user);


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
-- Name: SEQUENCE users_id_user_seq; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT ALL ON SEQUENCE vortex.users_id_user_seq TO vortex_admin;


--
-- Name: TABLE users; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.users TO vortex_admin;


--
-- Name: TABLE acc_criterias; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.acc_criterias TO vortex_admin;


--
-- Name: TABLE companies; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.companies TO vortex_admin;


--
-- Name: TABLE histories; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.histories TO vortex_admin;


--
-- Name: TABLE projects; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.projects TO vortex_admin;


--
-- Name: TABLE roles; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.roles TO vortex_admin;


--
-- Name: TABLE sprints; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.sprints TO vortex_admin;


--
-- Name: TABLE versions; Type: ACL; Schema: vortex; Owner: postgres
--

GRANT SELECT,INSERT,DELETE,UPDATE ON TABLE vortex.versions TO vortex_admin;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,DELETE,UPDATE ON TABLES  TO vortex_admin;


--
-- PostgreSQL database dump complete
--
